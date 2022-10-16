import React, {
  useState, useRef
} from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import { MeshBasicMaterial, SphereBufferGeometry } from "three";
function Module({
}) {

  function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  

  return (
    <div id="canvas">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 70 }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
      >
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 15]} />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={2048}
            mixBlur={1}
            mixStrength={40}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      <Box position={[0, 0, 0]} />
      <ambientLight />
    <pointLight position={[10, 10, 10]} />
        
      </Canvas>
    </div>
  );
}

export default Module;

