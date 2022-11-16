import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import postalcode from "../../../../assets/scans/postalcode.glb";
import train from "../../../../assets/scans/train.glb";
import corner from "../../../../assets/scans/corner.glb";
import riverside from "../../../../assets/scans/riverside.glb";
import Loader from "../Loader/index";
import { data } from "../../../../data";
import { useSpring, a, useSprings } from "@react-spring/three";
import { PositionalAudio } from "@react-three/drei";
import Scene from "../scene";

function Scenes({ current, scroll, audio }) {
  const ref = useRef();
  const group = useRef();

//   const [scenes, setScenes] = useState([])
  


// useEffect(()=>{
//   data.map((el, i)=>{
//     if (el.type === "view") {
//       setScenes((scenes) => [...scenes, el])
      
//     } 
//   })
// },[])


 


  const sceneprops = {
    current: current,
    scroll: scroll,
    audio: audio,
 

  }

  return (
    
      <a.group ref={group} >
        {/* <Suspense fallback={<Loader />}> */}
        {data.map((el, i) => {
            return el.type === "view" && (<Scene key={i} el={el} i={i} {...sceneprops}/>) 
        })}
        {/* </Suspense> */}
      </a.group>
    
  );
}

export default Scenes;
