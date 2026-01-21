import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { useGLTF, PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import useWindowSize from "../../../../hooks/windowSize";
import Cameras from "../cameras/index.js";


function Model({ i, el, current, scroll, sectionSize, audio, audioRef }) {
  const ref = useRef();
  const group = useRef();
  const camera = useRef();

  // IMPORT MODEL

  const { nodes, materials } = useGLTF(el.sections[0].object);

    // Checks if the scene is Visible
    const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

    // Remove is set to True after opacity animation
    const [remove, setRemove] = useState(true);

  // Model View Animations

  if (group.current) {
    group.current.visible = false;
    group.current.visible = remove ? false : true;
  }
  const { opacity } = useSpring({
    opacity: isVisible ? 1 : 0,
    onRest: () => current !== el.index && setRemove(true),
  });


  useEffect(() => {
    // Adds texture to Station
    // if (current !== 2) {
    //   // materials.main.map = null;
    // }
    // materials.main.map = null;
    materials.main.color = new THREE.Color(0x4f4f51);
    materials.main.transparent = true;
    materials.main.opacity = opacity;
    materials.main.needsUpdate = true;

   // Postcode
   if (current === 0) {
    if (ref.current !== undefined) {

      // ref.current.position.x = 2;
      // ref.current.position.y = -2;
      // ref.current.position.z = -40;

      ref.current.position.x = 4;
      ref.current.position.y = 1;
      ref.current.position.z = -32;

      // ref.current.rotation.x = 0.13;
      ref.current.rotation.x = .3;
      // ref.current.rotation.z = 0.18;
      let scale = 1.8
      ref.current.scale.x = scale;
      ref.current.scale.y = scale;
      ref.current.scale.z = scale;
    }
  }
    // Pier
    if (current === 1) {
      if (ref.current !== undefined) {

        ref.current.position.x = -3;
        ref.current.position.y = -1.8;
        ref.current.position.z = 0;

        ref.current.rotation.x = 0;
        ref.current.rotation.y = 1.25;
        ref.current.rotation.z = 0;

        // ref.current.castShadow = true;
        // ref.current.scale = 1.8;
      }
    }
    // Station
    if (current === 2) {
      if (ref.current !== undefined) {
        ref.current.position.x = -0.2;
        ref.current.position.y = -4.8;
        ref.current.position.z = 30;

        ref.current.rotation.x = .13;
        ref.current.rotation.y = -.96;
        ref.current.rotation.z = .18;

      }
    }
    // LCC
    if (current === 3) {
      if (ref.current !== undefined) {
        ref.current.position.x = -2;
        ref.current.position.y = 1;
        ref.current.position.z = 0;

        ref.current.rotation.x = 0;
        ref.current.rotation.y = 0;
        ref.current.rotation.z = 0;
    
      }
    }
  }, []);

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
  const [startValue, setStartValue] = useState(0);

  useEffect(() => {
    // Removes all elements in array past index, then adds all of them together
    if (sectionSize) {
      setStartValue(sectionSize.slice(0, i).reduce((a, b) => a + b, 0));
    }
  }, [sectionSize]);

  //SCROLLING ANIMATIONS

  useFrame((state) => {
    // Postcode
    if (current === 0) {
      if (ref.current !== undefined) {
        ref.current.rotation.y = -scroll / 400 + 75;
      }
    }
    // Pier
    if (current === 1) {
      if (ref.current !== undefined) {
      //  ref.current.rotation.y = (scroll-startValue) / 400;
      }
    }
     // Station
     if (current === 2) {
      if (ref.current !== undefined) {
      //  ref.current.rotation.y = (scroll-startValue) / 400;
      }
    }
    // LCC
    if (current === 3) {
      if (ref.current !== undefined) {
        ref.current.rotation.y =  - (scroll-startValue)/ 400 + 65;
      }
    }

  });
  

  // PROPS

  const camprops = {
    el: el,
    // ref: ref,
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
      <mesh
        ref={ref}
        geometry={nodes.mesh.geometry}
        castShadow
        scale={1.8}
      >
        <a.meshStandardMaterial {...materials.main} />
      </mesh>
        <Cameras {...camprops} />
    </group>
  );
}

export default Model;
