import * as THREE from 'three'
import { extend } from '@react-three/fiber'
import glsl from 'babel-plugin-glsl/macro'

// function getPoint(v, size, data, offset) {
//     v.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
//     if (v.length() > 1) return getPoint(v, size, data, offset)
//     return v.normalize().multiplyScalar(size).toArray(data, offset)
//   }
  
//   function getSphere(count, size, p = new THREE.Vector3()) {
//     const data = new Float32Array(count * 3)
//     for (let i = 0; i < count * 3; i += 3) getPoint(p, size, data, i)
//     return data
//   }
  const getRandomData = (width, height) => {
    // we need to create a vec4 since we're passing the positions to the fragment shader
    // data textures need to have 4 components, R, G, B, and A
    const length = width * height * 4 
    const data = new Float32Array(length);
      
    for (let i = 0; i < length; i++) {
      const stride = i * 4;
  
      const distance = Math.sqrt((Math.random() - 0.5)) * 2.0;
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
  
      data[stride] =  distance * Math.sin(theta) * Math.cos(phi)
      data[stride + 1] =  distance * Math.sin(theta) * Math.sin(phi);
      data[stride + 2] =  distance * Math.cos(theta);
      data[stride + 3] =  1.0; // this value will not have any impact
    }
    
    return data;
  }

  class SimulationMaterial extends THREE.ShaderMaterial {
    constructor() {
       let size = 512
      const positionsTexture = new THREE.DataTexture(
        getRandomData(size * size, size/3),
        size,
        size,
        THREE.RGBAFormat,
        THREE.FloatType
      );
      positionsTexture.needsUpdate = true;
  
      const simulationUniforms = {
        positions: { value: positionsTexture },
        uTime: { value: 0 },
        uCurlFreq: { value: 0.25 }
      };
  
      super({
        uniforms: simulationUniforms,
        vertexShader: `varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: glsl`uniform sampler2D positions;
      uniform float uTime;
      uniform float uCurlFreq;
      varying vec2 vUv;
      #pragma glslify: curl = require(glsl-curl-noise2)
      #pragma glslify: noise = require(glsl-noise/classic/3d.glsl)      
      void main() {
        float t = uTime * 0.015;
        vec3 pos = texture2D(positions, vUv).rgb; // basic simulation: displays the particles in place.
        vec3 curlPos = texture2D(positions, vUv).rgb;
        pos = curl(pos * uCurlFreq + t);
        curlPos = curl(curlPos * uCurlFreq + t);
        curlPos += curl(curlPos * uCurlFreq * 2.0) * 0.5;
        curlPos += curl(curlPos * uCurlFreq * 4.0) * 0.25;
        curlPos += curl(curlPos * uCurlFreq * 8.0) * 0.125;
        curlPos += curl(pos * uCurlFreq * 16.0) * 0.0625;
        gl_FragColor = vec4(mix(pos, curlPos, noise(pos + t)), 1.0);
      }`,
    //   uniforms: {
    //     positions: { value: new THREE.DataTexture(getSphere(512 * 512, 128), 512, 512, THREE.RGBAFormat, THREE.FloatType) },
    //     uTime: { value: 0 },
    //     uCurlFreq: { value: 0.25 }
    //   }
      });
    }
  }
  
  export default SimulationMaterial;
  
// class SimulationMaterial extends THREE.ShaderMaterial {
//   constructor() {
//     super({
//       vertexShader: `varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }`,
//       fragmentShader: glsl`uniform sampler2D positions;
//       uniform float uTime;
//       uniform float uCurlFreq;
//       varying vec2 vUv;
//       #pragma glslify: curl = require(glsl-curl-noise2)
//       #pragma glslify: noise = require(glsl-noise/classic/3d.glsl)      
//       void main() {
//         float t = uTime * 0.015;
//         vec3 pos = texture2D(positions, vUv).rgb; // basic simulation: displays the particles in place.
//         vec3 curlPos = texture2D(positions, vUv).rgb;
//         pos = curl(pos * uCurlFreq + t);
//         curlPos = curl(curlPos * uCurlFreq + t);
//         curlPos += curl(curlPos * uCurlFreq * 2.0) * 0.5;
//         curlPos += curl(curlPos * uCurlFreq * 4.0) * 0.25;
//         curlPos += curl(curlPos * uCurlFreq * 8.0) * 0.125;
//         curlPos += curl(pos * uCurlFreq * 16.0) * 0.0625;
//         gl_FragColor = vec4(mix(pos, curlPos, noise(pos + t)), 1.0);
//       }`,
//       uniforms: {
//         positions: { value: new THREE.DataTexture(getSphere(512 * 512, 128), 512, 512, THREE.RGBAFormat, THREE.FloatType) },
//         uTime: { value: 0 },
//         uCurlFreq: { value: 0.25 }
//       }
//     })
//   }
// }

extend({ SimulationMaterial })
