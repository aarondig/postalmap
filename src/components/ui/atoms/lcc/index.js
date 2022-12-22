import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import { InView } from "react-intersection-observer";

function Sound({ el, audio, camera, isVisible, audioRef, remove }) {
  const sound = useRef()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, el.audio)
  
  useEffect(()=>{
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(0);
    return () => {
      fadeOut();
    };
  },[]);

  function playSound() {
   
    sound.current.play();

    var source = listener.context.createBufferSource();
    source.connect(listener.context.destination);
    source.start();
  }

  
  audioRef.current.addEventListener('click', function() {
    if (!audio) {
      if (!sound.current.isPlaying) {
        playSound();
      }
      
    }
    if (audio) {
      sound.current.pause();
      sound.current.stop();
    }
  });


  //SOUND START/CLEANUP

  var fadeIn = () =>
    setTimeout(function () {
      if (sound.current !== undefined) {

      
      let volume = sound.current.getRefDistance();

      if (!sound.current.isPlaying) {
        sound.current.play();
      }

      if (volume < 1) {
        sound.current.setRefDistance(volume + 0.01);
        if (isVisible) {
          fadeIn();
        }
        if (!isVisible) {
          fadeOut();
          clearTimeout(fadeIn);
        }
      }
      if (volume >= 1) {
        sound.current.setRefDistance(1);
        clearTimeout(fadeIn);
      }
    }
      clearTimeout(fadeIn);
    }, 10);

  var fadeOut = () =>
    setTimeout(function () {
      if (sound.current !== undefined) {
      let volume = Math.abs(sound.current.getRefDistance());


      if (volume > 0) {
        sound.current.setRefDistance(Math.abs(volume - 0.01));
        if (!isVisible) {
          fadeOut();
        }
        if (isVisible) {
          fadeIn();
          clearTimeout(fadeOut);
        }
      }
      if (volume <= 0.1) {
        sound.current.setRefDistance(0);
        sound.current.pause();
        camera.current.remove(listener);
        clearTimeout(fadeOut);
      }
    }
      clearTimeout(fadeOut);
    }, 10);

  useEffect(() => {

    if (isVisible) {
      camera.current.add(listener);
      fadeIn();


    }
    if (!isVisible) {
      fadeOut();

    }
   return ()=>{
    clearTimeout(fadeIn);
    }
  }, [isVisible]);

 
  return (<positionalAudio ref={sound} args={[listener]}/>)
}

const Camera = ({camera, scroll, remove, startValue}) => {


  // Camera animations
  useFrame(() => {
    if (!remove) {
    camera.current.position.x =  -2;
    camera.current.position.y =  2;
    // ref.current.position.z =  ((scroll - startValue)/10) - 50;
    camera.current.position.z =  ((startValue - scroll )/25) + 60;
    
    camera.current.updateMatrixWorld();
    }
  });
const cameraprops = {
  ref: camera,
  makeDefault: !remove,
}

  return <PerspectiveCamera {...cameraprops}/>;
};

function Lcc({ i, el, current, scroll, sectionSize, audio, audioRef }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

// IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.sections[0].object);



  materials[""].map = null;
  materials[""].color = new THREE.Color(0x4F4F51);
  materials[""].transparent = true;
  materials[""].roughness = 1;

// Checks if the scene is Visible
const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

// Remove is set to True after opacity animation
const [remove, setRemove] = useState(true);

// Model View Animations

  if (group.current) {
    group.current.visible = remove ? false : true;
  }
 

  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0, onRest: () => current !== el.index && setRemove(true) });
  materials[""].opacity = opacity;

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

useEffect(()=>{
  // Removes all elements in array past index, then adds all of them together
  setStartValue(sectionSize.slice(0, i).reduce((a,b)=> a+b,0))
},[sectionSize])


//SCROLLING ANIMATIONS

  useFrame(() => {
    
      ref.current.rotation.y =  - (scroll-startValue)/ 400 + 65;
  });

  

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
    audioRef: audioRef,
    
  }
 


  return (
    
      <group ref={group}>
    
        <mesh
          ref={ref}
          geometry={nodes.mesh_0.geometry}
          position={[-2, 1, 0]}
          castShadow
          scale={1.8}
        >
         
          {audio && <Sound isVisible={isVisible} {...soundprops}/>}
          

          <a.meshStandardMaterial {...materials[""]} />
        </mesh>
        <Camera {...camprops}/>
        
       
      </group>
  );
}

export default Lcc;