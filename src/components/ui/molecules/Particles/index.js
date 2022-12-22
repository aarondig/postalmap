import * as THREE from 'three'
import { useMemo, useState, useRef, Suspense } from 'react'
import { createPortal, useFrame, extend } from '@react-three/fiber'
import { useFBO } from '@react-three/drei'
import './shaders/simulationMaterial'

import Loader from '../../molecules/Loader'

// import './shaders/dofPointsMaterial'

export function Particles({ orbit, move, speed, fov, aperture, focus, curl, size = 512, pointLoad, setPointLoad, ...props }) {
  // This reference gives us direct access to our points
  const simRef = useRef();
  const points = useRef();

  // Set up FBO
  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 20000))
  const [positions] = useState(() => new Float32Array([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0]))
  const [uvs] = useState(() => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]))
  const target = useFBO(size, size, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat, type: THREE.FloatType })
  

  // Normalize points
  const particles = useMemo(() => {
    const length = size * size
    const particles = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      let i3 = i * 3
      particles[i3 + 0] = (i % size) / size
      particles[i3 + 1] = i / size / size
    }
    
    return particles;
  }, [size])
 

  const uniforms = useMemo(() => ({
    positions: { value: null },
        uTime: { value: 0 },
        uFocus: { value: 5.1 },
        uFov: { value: 50 },
        uBlur: { value: 30 }
  }), [])


//   let duration = 2;
//   let timeElapsed = 0;

const vec = new THREE.Vector3(0,0,move);


let zoom = 0;
let fieldov = 0;
let runcount = 0;

  // Update FBO and pointcloud every frame

  useFrame((state) => {
    const { gl, clock } = state;

    gl.setRenderTarget(target);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Only runs once
    runcount += runcount + 1;

    if (runcount = 1) {
      setPointLoad(true);
    }

state.camera.position.lerp(vec, .001);
orbit !== undefined && orbit.update();

if (move < 6) {

//  state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, 10, .01);

}

  points.current.uniforms.positions.value = target.texture
  points.current.uniforms.uTime.value = state.clock.elapsedTime
  points.current.uniforms.uFocus.value = THREE.MathUtils.lerp(points.current.uniforms.uFocus.value, focus, 0.1)
  points.current.uniforms.uFov.value = THREE.MathUtils.lerp(points.current.uniforms.uFov.value, fov, 0.1)
  points.current.uniforms.uBlur.value = THREE.MathUtils.lerp(points.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1)
  simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed
  simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1)

    
  camera.updateProjectionMatrix();
  });
  // useFrame((state) => {
  //   state.gl.setRenderTarget(target)
    
    
  //   state.gl.clear()
  //   state.gl.render(scene, camera)
  //   state.gl.setRenderTarget(null)
  //   points.current.uniforms.positions.value = target.texture
  //   points.current.uniforms.uTime.value = state.clock.elapsedTime
  //   points.current.uniforms.uFocus.value = THREE.MathUtils.lerp(points.current.uniforms.uFocus.value, focus, 0.1)
  //   points.current.uniforms.uFov.value = THREE.MathUtils.lerp(points.current.uniforms.uFov.value, fov, 0.1)
  //   points.current.uniforms.uBlur.value = THREE.MathUtils.lerp(points.current.uniforms.uBlur.value, (5.6 - aperture) * 9, 0.1)
  //   simRef.current.uniforms.uTime.value = state.clock.elapsedTime * speed
  //   simRef.current.uniforms.uCurlFreq.value = THREE.MathUtils.lerp(simRef.current.uniforms.uCurlFreq.value, curl, 0.1)
  // })

  const vertexShader = `
  uniform sampler2D positions;
        uniform float uTime;
        uniform float uFocus;
        uniform float uFov;
        uniform float uBlur;
        varying float vDistance;
        void main() { 
          vec3 pos = texture2D(positions, position.xy).xyz;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          vDistance = abs(uFocus - -mvPosition.z);
          gl_PointSize = (step(1.0 - (1.0 / uFov), position.x)) * vDistance * uBlur;
        }`

  const fragmentShader = `
        uniform float uOpacity;
        varying float vDistance;
        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          if (dot(cxy, cxy) > 1.0) discard;
          gl_FragColor = vec4(vec3(1.0), (1.04 - clamp(vDistance * 1.5, 0.0, 1.0)));
        }`


  return (
    <>
      {/* Simulation goes into a FBO/Off-buffer */}
      {createPortal(
        <mesh>
          <Suspense fallback={<Loader/>}>
          <simulationMaterial ref={simRef} size={size}/>
          </Suspense>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        
        </mesh>,
        scene
      )}
      {/* The result of which is forwarded into a pointcloud via data-texture */}
      <points {...props}>
        {/* <dofPointsMaterial ref={points} /> */}
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' count={particles.length / 3} array={particles} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          ref={points}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
      </>
  )
}
