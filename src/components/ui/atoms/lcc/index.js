import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import { InView } from "react-intersection-observer";



const Camera = ({scroll, remove, startValue}) => {
  const ref = useRef();

  // Camera animations
  useFrame(() => {
    ref.current.position.x =  -2;
    ref.current.position.y =  2;
    // ref.current.position.z =  ((scroll - startValue)/10) - 50;
    ref.current.position.z =  ((startValue - scroll )/25) + 60;
    
    ref.current.updateMatrixWorld();
  });
const camera = {
  ref: ref,
  makeDefault: !remove,
}

  return <PerspectiveCamera {...camera}/>;
};

function Lcc({ i, el, current, scroll, sectionSize, audio }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

// IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.object);



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
 setStartValue((sectionSize.slice(-(i-1)).reduce((a, b) => a + b, 0) - 98))
},[sectionSize])


//SCROLLING ANIMATIONS
// const [positionz, setPositionz] = useState();

  useFrame(() => {
    
    ref.current.rotation.y =  - (scroll-startValue)/ 400 + 65;
    // ref.current.position.z =  - scroll / 400 ;
    // console.log(ref.current.rotation)
  });



  

const camprops = {
  scroll: scroll,
  isVisible: isVisible,
  remove: remove,
  startValue: startValue,
}
 


  return (
    
      <group ref={group}>
        <Suspense fallback={<Loader/>}>
        <mesh
          ref={ref}
          geometry={nodes.mesh_0.geometry}
          position={[-2, 1, 0]}
          castShadow
          scale={1.8}
        >
         
          {/* {audio && <Sound isVisible={isVisible}/>} */}
          

          <a.meshStandardMaterial {...materials[""]} />
        </mesh>
        <Camera {...camprops}/>
        
        </Suspense>
      </group>
  );
}

export default Lcc;