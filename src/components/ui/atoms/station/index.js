import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { useGLTF, PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import useWindowSize from "../../../../hooks/windowSize";
import { WebGLRenderer } from "three";

function Sound({ el, audio, camera, isVisible }) {
  const soundRef = useRef();
  const { audioManager } = require('../../../../utils/AudioManager');

  // Initialize audio manager once
  useEffect(() => {
    if (camera.current) {
      audioManager.init(camera.current);
    }
  }, []);

  // Load audio on mount
  useEffect(() => {
    audioManager.playSceneAudio(
      el.id,
      el.audio,
      false, // Don't auto-play on load
      (sound) => {
        soundRef.current = sound;
      }
    );

    return () => {
      // Fade out and stop when component unmounts
      if (soundRef.current) {
        audioManager.fadeOut(soundRef.current, 1000, true);
      }
    };
  }, [el.id, el.audio]);

  // Handle visibility and audio toggle changes
  useEffect(() => {
    // Only manage playback if sound is loaded
    if (soundRef.current) {
      // Only call playSceneAudio when this scene is visible
      // Audio on/off is controlled by the audio parameter
      if (isVisible) {
        audioManager.playSceneAudio(el.id, el.audio, audio);
      }
    }
  }, [isVisible, audio, el.id, el.audio]);

  // Return the audio element for Three.js scene graph
  return soundRef.current ? (
    <primitive object={soundRef.current} position={[0, 0, -20]} />
  ) : null;
}

const Camera = ({camera, scroll, isVisible, remove, startValue}) => {
const {height} = useWindowSize();
  // Camera animations
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
  


  useFrame(() => {
    if (!remove) {
    camera.current.position.x =  0;
    camera.current.position.y =  -2;
   
    camera.current.position.z =  range(startValue-height, startValue + height, -10, 90, scroll);
   
   
    camera.current.updateMatrixWorld();
  } 
  });
const cameraProps = {
  ref: camera,
  makeDefault: isVisible,
}

  return <PerspectiveCamera {...cameraProps}/>;
};

function Station({ i, el, current, scroll, sectionSize, audio }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

// IMPORT MODEL
  // const { nodes, materials } = useLoader(GLTFLoader, el.sections[0].object);
  const { nodes, materials } = useGLTF(el.sections[0].object);

// Checks if the scene is Visible
const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

// Remove is set to True after opacity animation
const [remove, setRemove] = useState(true);

// Model View Animations

  if (group.current) {
    group.current.visible = remove ? false : true;
  }
  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0, onRest: () => current !== el.index && setRemove(true) });
  
useEffect(()=>{
   // materials.main.map = null;
  materials.main.color = new THREE.Color(0x4F4F51);
  materials.main.transparent = true;
  materials.main.opacity = opacity;
},[])

 

 
  
 

// STARTUP

useEffect(() => {
  if (current === el.index) {
    setRemove(false)
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
}, [current]);


// Measure the size of all sections before it and create a start value for scrolling
const [startValue, setStartValue] = useState(0)

// useEffect(()=>{
//   // Removes all elements in array past index, then adds all of them together
if(sectionSize){
//   setStartValue(sectionSize.slice(0, i).reduce((a,b)=> a+b,0))
}
// },[sectionSize])


//SCROLLING ANIMATIONS

  const camprops = {
    camera: camera,
    scroll: scroll,
    isVisible: isVisible,

    remove: remove,
    startValue: startValue,
  }
  const soundprops = {
    el: el,
    camera: camera,
    scroll: scroll,
    isVisible: isVisible,
    remove: remove,

    audio: audio,
    
    
  }
 


  return (
    
      <group ref={group}>

        <mesh
          ref={ref}
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[-.2, -4.8, 30]}
          rotation={[.13, -.96, .18]}
          castShadow
          scale={1.8}
        >
         
       
          
         <Sound {...soundprops}/>
          <a.meshStandardMaterial {...materials.main} />
        </mesh>
        <Camera {...camprops}/>
     
        <ambientLight intensity={.5} />
        <pointLight position={[0, 0, 3]} intensity={.3} />
        <pointLight position={[0, 0, 60]} intensity={.3} />
      

        
        {/* <PerspectiveCamera ref={camera} position={el.position} makeDefault={!remove ? true : (!isVisible ? false : true)} /> */}
      </group>
  );
}

export default Station;

