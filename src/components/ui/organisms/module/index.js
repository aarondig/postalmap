import React, { useState, useRef, Suspense } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  softShadows
} from "@react-three/drei";
import Scene from "../../molecules/scene";
import { data } from "../../../../data";
import Scenes from "../../molecules/scenes";


function Module({scroll, current, audio}) {

const scenes = {
  current: current,
  scroll: scroll,
  audio: audio,
}

// const group = useRef()
// useFrame(()=> {
//   console.log(group.current)
// })

// const cameras = { 
// postcode: {
//   position: [0,1.5, 3], fov: 70
// },
// hallway: {
//   position: [0,1.5, 3], fov: 70
// }
// }
// console.log()
  return (
    <div id="canvas">
      
      
      
      <Canvas
      // camera={cameras[current]}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
      >
    {/* <rectAreaLight position={[0, 20, 10]} intensity={40} width={200}
      height={1}/> */}

<rectAreaLight position={[0, 20, 40]} intensity={80} width={200}
      height={1}/>
        {/* <pointLight position={[4, 2, 4]} intensity={1} />
        <pointLight position={[-5, 0, -3]} intensity={.3} /> */}
        <OrbitControls />

        {/* <Suspense fallback={<div style={{background: 'red', width: "100%", height: "100%", zIndex: 1}} />}> */}
        

        
   <Scenes {...scenes}/>
   {/* <ambientLight intensity={.1}/> */}
          {/* <Environment preset="studio" near={1} far={1000} resolution={256}/> */}
  

        
        {/* <mesh position={[0, -1, 2]} rotation={[-1.568, 0, 0]}>
          <cylinderBufferGeometry args={[.05, .05, 100]} />
          <meshBasicMaterial
            
            color="red"
          />
        </mesh> */}

       
        {/* <spotLight intensity={0.3} angle={0.3} penumbra={1} position={[5, 25, 20]} shadow-bias={-0.0001} castShadow />
        <ambientLight intensity={10} /> */}



        {/* <hemisphereLight
          color="#ffffff"
          groundColor="#707070"
          position={[0, 25, -30]}
          intensity={0.85}
          castShadow
        /> */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh> */}
      </Canvas>
      
    </div>
  );
}

export default Module;
