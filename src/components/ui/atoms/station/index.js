import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import { InView } from "react-intersection-observer";

function Sound({ el, audio, camera, isVisible, remove }) {
  const sound = useRef();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, el.audio);
  useEffect(()=>{
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(0);
    return () => camera.current.remove(listener);
  },[]);
// Prevents static overlay of both audio files


  function playSound() {
   
    sound.current.play();

    var source = listener.context.createBufferSource();
    source.connect(listener.context.destination);
    source.start();
  }

  
  document.addEventListener('click', playSound);

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
    clearTimeout(fadeOut);
    }
  }, [isVisible]);

  return <positionalAudio ref={sound} args={[listener]} />;
}

const Camera = ({camera, scroll, remove, startValue}) => {

  // Camera animations
  useFrame(() => {
    camera.current.position.x =  0;
    camera.current.position.y =  -2;
    camera.current.position.z =  ((scroll - startValue)/10) - 50;
    
    camera.current.updateMatrixWorld();
  });
const cameraProps = {
  ref: camera,
  makeDefault: !remove,
}

  return <PerspectiveCamera {...cameraProps}/>;
};

function Station({ i, el, current, scroll, sectionSize, audio }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

// IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.object);

  // materials.main.map = ;
  materials.main.color = new THREE.Color(0x4F4F51);
  materials.main.transparent = true;
  materials.main.roughness = 1;

// Checks if the scene is Visible
const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

// Remove is set to True after opacity animation
const [remove, setRemove] = useState(true);

// Model View Animations

  if (group.current) {
    group.current.visible = remove ? false : true;
  }
 
  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0, onRest: () => current !== el.index && setRemove(true) });
  materials.main.opacity = opacity;

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
 setStartValue((sectionSize.slice(-(i-1)).reduce((a, b) => a + b, 0) - 98))
},[sectionSize])


//SCROLLING ANIMATIONS


  useFrame(() => {

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
    
  }
 


  return (
    
      <group ref={group}>
        <Suspense fallback={<Loader/>}>
        <mesh
          ref={ref}
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[-.2, -4.8, 30]}
          rotation={[.13, -.96, .18]}
          castShadow
          scale={1.8}
        >
         
       
          
         {audio && <Sound {...soundprops}/>}
          <a.meshStandardMaterial {...materials.main} />
        </mesh>
        <Camera {...camprops}/>
        <ambientLight intensity={.5} />
        <pointLight position={[0, 0, 3]} intensity={.3} />
        <pointLight position={[0, 0, 60]} intensity={.3} />
        {/* <pointLight position={[-5, 0, -3]} intensity={.5}/> */}

        
        {/* <PerspectiveCamera ref={camera} position={el.position} makeDefault={!remove ? true : (!isVisible ? false : true)} /> */}
        </Suspense>
      </group>
  );
}

export default Station;

