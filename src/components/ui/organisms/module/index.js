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


function Module({scroll, current, audio}) {

const scene = {
  current: current,
  scroll: scroll,
  audio: audio,
}

const background = {
  
}

  return (
    <div id="canvas" style={{background: "linear-gradient(160deg, #151515 20%, #404040);"}}>
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 70 }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
      >

        <pointLight position={[4, 2, 4]} intensity={1} />
        <pointLight position={[-5, 0, -3]} intensity={.3} />
        <OrbitControls />


        {data.map((el, i) => {
          
       
            return data[i].type === "view" && <Scene key={i} el={el} i={i} {...scene}/>

        })}

          {/* <Environment preset="city"/> */}
  

        
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
