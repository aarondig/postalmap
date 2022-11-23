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
import { data } from "../../../../data";
import Scenes from "../../molecules/scenes";
import { InView, useInView } from "react-intersection-observer";
import Loader from "../../molecules/Loader";


function Module({scroll, direct, current, isInView, starterValue, audio}) {

  

const scenes = {
  scroll: scroll,
  direct: direct,

  current: current,
  isInView: isInView,
  starterValue: starterValue,
  
  audio: audio,
}

const canvas = {
  id: "canvas",

};

  return (
      <div {...canvas}>
      <Canvas
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
      >
        <Suspense fallback={<Loader/>}>
    {/* <rectAreaLight position={[0, 20, 10]} intensity={40} width={200}
      height={1}/> */}

<rectAreaLight position={[0, 20, 40]} intensity={80} width={200}
      height={1}/>
        {/* <pointLight position={[4, 2, 4]} intensity={1} />
        <pointLight position={[-5, 0, -3]} intensity={.3} /> */}
        <OrbitControls />

        
   <Scenes {...scenes}/>
   {/* <ambientLight intensity={.1}/> */}
          {/* <Environment preset="studio" near={1} far={1000} resolution={256}/> */}
  

        

       
        {/* <spotLight intensity={0.3} angle={0.3} penumbra={1} position={[5, 25, 20]} shadow-bias={-0.0001} castShadow />
        <ambientLight intensity={10} /> */}



        {/* <hemisphereLight
          color="#ffffff"
          groundColor="#707070"
          position={[0, 25, -30]}
          intensity={0.85}
          castShadow
        /> */}
        </Suspense>
      </Canvas>
      </div>
  );
}

export default Module;
