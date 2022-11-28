import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";

function Sound({ el, audio, camera, isVisible, remove }) {
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

  
  document.addEventListener('click', !audio && playSound);


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

 
  return (<positionalAudio ref={sound} args={[listener]}/>)
}

const Camera = ({ camera, startValue, scroll, remove,  }) => {
  const position = [0,10,75];
  // Camera animations
  useFrame(() => {
    camera.current.position.x =  0 ;
    camera.current.position.z = 70 - (scroll / 10);
    // camera.current.position.z = -40 +((scroll-(startValue+300)) / 10) ;

    camera.current.updateMatrixWorld();
  });
  return (
    <PerspectiveCamera
      ref={camera}
      position={position}
      makeDefault={!remove}
    ></PerspectiveCamera>
  );
};

function Postcode({ i, el, current, scroll, sectionSize, audio }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

  // IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.object);

  materials.main.map = null;
  materials.main.color = new THREE.Color(0x4f4f51);
  materials.main.transparent = true;

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
 setStartValue((sectionSize.slice(-(i)).reduce((a, b) => a + b, 0) - 98))
},[sectionSize])

  //SCROLLING ANIMATIONS

  useFrame(() => {
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
    
  }

  return (
    <group ref={group}>
      <mesh
        ref={ref}
        // material={materials.main}
        geometry={nodes.mesh.geometry}
        position={[0, -1, 0]}
        castShadow
        scale={1.8}
      >
        {audio && (
          <Sound {...soundprops} />
        )}
        <a.meshStandardMaterial {...materials.main} />
      </mesh>
      <Camera {...camprops} />
    </group>
  );
}

export default Postcode;
