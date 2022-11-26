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
    ref.current.position.x =  0;
    ref.current.position.y =  -2;
    ref.current.position.z =  ((scroll - startValue)/10) - 50;
    
    ref.current.updateMatrixWorld();
  });
const camera = {
  ref: ref,
  makeDefault: !remove,
}

  return <PerspectiveCamera {...camera}/>;
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
// const [positionz, setPositionz] = useState();

  useFrame(() => {
    
    // ref.current.rotation. =  - scroll / 400 + 75;
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
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[-.2, -4.8, 30]}
          rotation={[.13, -.96, .18]}
          castShadow
          scale={1.8}
        >
         
          {/* {audio && <Sound isVisible={isVisible}/>} */}
          

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


 // i=== current && console.log(positionz - (scroll / 2))

//AUDIO

// const { distance } = useSpring({ distance: isVisible ? 1 : 100 });

// const [playAudio, setPlayAudio] = useState(false);
// const [fadeOut, setFadeOut] = useState(false);

// function Sound({isVisible}) {
//   const sound = useRef();
//   const { camera } = useThree();
//   const [listener] = useState(() => new THREE.AudioListener());
//   const buffer = useLoader(THREE.AudioLoader, el.audio);

// useFrame(()=>{
//   sound.current.setRefDistance(scroll)
// })
//   useEffect(() => {
//     sound.current.setBuffer(buffer);
//     sound.current.setRefDistance(1);
//     sound.current.setLoop(true);
//     sound.current.play();
//     camera.add(listener);

//     return () => camera.remove(listener);
//   }, []);
//   return <positionalAudio ref={sound} args={[listener]} />;
// }