import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { useGLTF, PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import useWindowSize from "../../../../hooks/windowSize";

function Sound({ el, audio, camera, isVisible }) {
  const soundRef = useRef();
  const { audioManager } = require('../../../utils/AudioManager');

  useEffect(() => {
    // Initialize audio manager with camera
    if (camera.current) {
      audioManager.init(camera.current);
    }

    // Load and manage audio for this scene
    audioManager.playSceneAudio(
      el.id,
      el.audio,
      isVisible,
      (sound) => {
        soundRef.current = sound;
      }
    );

    return () => {
      // Fade out when component unmounts
      if (soundRef.current) {
        audioManager.fadeOut(soundRef.current);
      }
    };
  }, []);

  // Handle visibility and audio toggle changes
  useEffect(() => {
    audioManager.setEnabled(audio);
    audioManager.playSceneAudio(el.id, el.audio, isVisible && audio);
  }, [isVisible, audio]);

  // Return the audio element for Three.js scene graph
  return soundRef.current ? (
    <primitive object={soundRef.current} position={[0, 0, -20]} />
  ) : null;
}


const Camera = ({ camera, isVisible, startValue, scroll, remove,   }) => {

  const {height} = useWindowSize();
// Camera animations
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
  useFrame(() => {
if (!remove) {

    camera.current.position.z = range(startValue - height, startValue + height, -4, 6, scroll );
    camera.current.position.y = range(startValue - height, startValue + height, 10, -.5, scroll );
    camera.current.rotation.y = range(startValue-height, startValue + height, .705, -.2, scroll) ;
    camera.current.rotation.x = range(startValue-height, startValue + height, -.28, .1, scroll) ;


    camera.current.updateMatrixWorld();
  }
  });
  return (
    <PerspectiveCamera
      ref={camera}
      makeDefault={isVisible}
    ></PerspectiveCamera>
  );
};

function Postcode({ i, el, current, scroll, sectionSize, audio, audioRef }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

  // IMPORT MODEL
  // const { nodes, materials } = useLoader(GLTFLoader, el.sections[0].object);
  const { nodes, materials } = useGLTF(el.sections[0].object);

  useEffect(()=>{
    materials.main.map = null;
    materials.main.color = new THREE.Color(0x4f4f51);
    materials.main.transparent = true;
    materials.main.needsUpdate = true;

  },[])
 

  // Checks if the scene is Visible
  const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

  // Remove is set to True after opacity animation
  const [remove, setRemove] = useState(true);

  // Model View Animations

  if (group.current) {
    group.current.visible = remove ? false : true;
  }

  const { opacity } = useSpring({
    opacity: isVisible ? 1 : 0,
    onRest: () => current !== el.index && setRemove(true),
  });
  materials.main.opacity = opacity;

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

  useFrame((state) => {
    ref.current.rotation.y = -scroll / 400 + 75;
  });

// PROPS

  const camprops = {
    camera: camera,
    scroll: scroll,
    isVisible: isVisible,
    remove: remove,
    startValue: startValue,
  };
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
        // material={materials.main}
        geometry={nodes.mesh.geometry}
        position={[0, -1, -40]}
        scale={1.8}
      >
        
          <Sound {...soundprops} />
       
        <a.meshStandardMaterial {...materials.main} />
      </mesh>
      <Camera {...camprops} />
    </group>
  );
}

export default Postcode;
