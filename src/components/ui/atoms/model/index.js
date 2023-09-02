import React, { useState, useRef, Suspense, useEffect, forwardRef } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import useWindowSize from "../../../../hooks/windowSize";
import Cameras from "../cameras/index";

// function Sound({ el, audio, camera, isVisible, audioRef, remove }) {
//   // const sound = useRef()
//   // const [listener] = useState(() => new THREE.AudioListener())
//   // const buffer = useLoader(THREE.AudioLoader, el.audio)
  
//   // useEffect(()=>{
//   //   sound.current.setBuffer(buffer);
//   //   sound.current.setRefDistance(0);
//   //   return () => {
//   //     fadeOut();
//   //   };
//   // },[]);

//   // function playSound() {

//   //   var source = listener.context.createBufferSource();
//   //   source.connect(listener.context.destination);
//   //   source.start();
//   // }

  
//   // audioRef.current.addEventListener('click', function() {
//   //   if (!audio) {
//   //     if (!sound.current.isPlaying) {
//   //       playSound();
//   //     }
      
//   //   }
//   //   if (audio) {
//   //     sound.current.pause();
//   //     sound.current.stop();
//   //   }
//   // });


//   // //SOUND START/CLEANUP

//   // var fadeIn = () =>
//   //   setTimeout(function () {
//   //     if (sound.current !== undefined) {

      
//   //     let volume = sound.current.getRefDistance();

//   //     if (!sound.current.isPlaying) {
//   //       sound.current.play();
//   //     }

//   //     if (volume < 1) {
//   //       sound.current.setRefDistance(volume + 0.01);
//   //       if (isVisible) {
//   //         fadeIn();
//   //       }
//   //       if (!isVisible) {
//   //         clearTimeout(fadeIn);
//   //       }
//   //     }
//   //     if (volume >= 1) {
//   //       sound.current.setRefDistance(1);
//   //       clearTimeout(fadeIn);
//   //     }
//   //   }
//   //     clearTimeout(fadeIn);
//   //   }, 10);

//   // var fadeOut = () =>
//   //   setTimeout(function () {
//   //     if (sound.current !== undefined) {
//   //     let volume = Math.abs(sound.current.getRefDistance());


//   //     if (volume > 0) {
//   //       sound.current.setRefDistance(Math.abs(volume - 0.01));
//   //       if (!isVisible) {
//   //         fadeOut();
          
//   //       }
//   //       if (isVisible) {
//   //         camera.current.remove(listener);
//   //         sound.current.setRefDistance(0);
//   //         clearTimeout(fadeOut);
//   //       }
//   //     }
//   //     if (volume <= 0.1) {
//   //       sound.current.setRefDistance(0);
//   //       sound.current.pause();
//   //       camera.current.remove(listener);
//   //       clearTimeout(fadeOut);
//   //     }
//   //   }
//   //     clearTimeout(fadeOut);
//   //   }, 10);

//   // useEffect(() => {

//   //   if (isVisible) {
//   //     camera.current.add(listener);
//   //     clearTimeout(fadeOut);
//   //     fadeIn();

//   //   }
//   //   if (!isVisible) {
//   //     clearTimeout(fadeIn);
//   //     fadeOut();
     
//   //   }
//   //  return ()=>{
//   //   clearTimeout(fadeIn);
//   //   camera.current.remove(listener);
//   //   }
//   // }, [isVisible]);

//   // let vol = sound.current ? sound.current.getRefDistance() : 0;
  
//   // // useEffect(() => {

//   // //   sound.current && console.log("station: " + sound.current.getRefDistance())
//   // // }, [vol]);



 
//   // return (<positionalAudio ref={sound} args={[listener]}/>)
// }

function Model({ i, el,  current, scroll, sectionSize, audio, audioRef }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

  // Checks if the scene is Visible
  const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

  // Remove is set to True after opacity animation
  const [remove, setRemove] = useState(true);

  // IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.sections[0].object);


// Model View Animations

if (group.current) {
  group.current.visible = remove ? false : true;
}

const { opacity } = useSpring({
  opacity: isVisible ? 1 : 0,
  onRest: () => current !== el.index && setRemove(true),
});





  useEffect(()=>{
  //  If not LCC which has a different model type
    if (current !== 3){
      // Adds texture to Station
      if (current !== 2){
        materials.main.map = null;
      }
      materials.main.color = new THREE.Color(0x4f4f51);
      materials.main.transparent = true;
      materials.main.needsUpdate = true;
      materials.main.opacity = opacity;
      ref.current.geometry = nodes.mesh.geometry;
      
    }
    else {
      materials[""].map = null;
       materials[""].color = new THREE.Color(0x4F4F51);
       materials[""].transparent = true;
       materials[""].roughness = 1;
       materials[""].opacity = opacity;
      ref.current.geometry = nodes.mesh_0.geometry;
    }
    
  },[])
 

  

  

  // STARTUP

  useEffect(() => {
    if (current === el.index) {
      setRemove(false);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [current]);

// Measure the size of all sections before it and create a start value for scrolling
const [startValue, setStartValue] = useState(0)

useEffect(()=>{
  // Removes all elements in array past index, then adds all of them together
  if(sectionSize){
    setStartValue(sectionSize.slice(0, i).reduce((a,b)=> a+b,0))
  }
 
},[sectionSize])


  //SCROLLING ANIMATIONS


  // useFrame((state) => {
  //   ref.current.rotation.y = -scroll / 400 + 75;
  // });

// PROPS

  const camprops = {
    el: el,
    ref: ref,
    camera: camera,
    scroll: scroll,
    isVisible: isVisible,
    remove: remove,
    startValue: startValue,
    
  };
  // const soundprops = {
  //   el: el,
  //   camera: camera,
  //   scroll: scroll,
  //   isVisible: isVisible,
  //   remove: remove,

  //   audio: audio,
  //   audioRef: audioRef,
    
  // }

  return (
    <group ref={group}>
      
      <mesh ref={ref}
      position={[-.2, -4.8, 30]}
      rotation={[.13, -.96, .18]}
      castShadow
      scale={1.8}>
    <a.meshStandardMaterial {...materials.main} />
  </mesh>
      
      <Cameras {...camprops} /> 
    </group>
  );
}

export default Model;
