import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Loader from "../Loader/index";
import { data } from "../../../../data";
import { useSpring, a, useSprings } from "@react-spring/three";
import { PositionalAudio } from "@react-three/drei";
import Postcode from "../../atoms/postcode";
import Pier from "../../atoms/pier";


function Scenes({ current, scroll, isInView, starterValue, audio }) {
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

    isInView: isInView,
    starterValue: starterValue,
 

  }
  

  return (
      <group ref={group} >
        <Suspense fallback={<Loader/>}>
        {data.map((el, i) => {
          switch (el.id) {
            default: {
              return null;
            }
            case "postcode": {
             
              return <Postcode key={i} el={el} i={i} {...sceneprops}/>;
            }
            case "pier": {
              
              return <Pier key={i} el={el} i={i} {...sceneprops}/>;
            }

          }
        })}
        </Suspense>
      </group>
  );
}

export default Scenes;
