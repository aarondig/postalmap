import React, { useState, useRef, Suspense } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  softShadows,
  Preload
} from "@react-three/drei";
import { data } from "../../../../data";
import Scenes from "../../molecules/scenes";
import { InView, useInView } from "react-intersection-observer";
import Loader from "../../molecules/Loader";


function Module({i, el, scroll, direct, current, isInView, sectionSize, audio, audioRef}) {

 

const scenes = {
  i: i,
  el: el,
  scroll: scroll,
  direct: direct,

  current: current,
  isInView: isInView,
  sectionSize: sectionSize,
  
  audio: audio,
  audioRef: audioRef,
}

const canvas = {
  id: "canvas",
  className:"module",

};

  return (
      <div {...canvas}>
      <Canvas
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
        frameloop="demand"
      >
        
        
      <rectAreaLight position={[0, 20, 40]} intensity={90} width={200}
      height={1}/>

        <fog attach="fog" args={['#17171b', 40, 80]} />
        <Suspense fallback={<Loader/>}>
   <Scenes {...scenes}/>
   </Suspense>
   <Preload all/>
      </Canvas>
      </div>
  );
}

export default Module;
