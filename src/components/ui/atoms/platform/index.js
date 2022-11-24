import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";



const Camera = ({scroll, remove, starterValue}) => {
  const position = [0, 10, 20]
  const ref = useRef();

  // Camera animations
  useFrame(() => {
    // ref.current.position.z = position[2] - (scroll / 10) ;

    ref.current.updateMatrixWorld();
  });
  return <PerspectiveCamera ref={ref} position={position} makeDefault={!remove}/>;
};

function Platform({ i, el, current, scroll, starterValue, audio }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

// IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.object);

  materials.main.map = null;
  materials.main.color = new THREE.Color(0x505050);
  materials.main.transparent = true;

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

//SCROLLING ANIMATIONS
// const [positionz, setPositionz] = useState();

  useFrame(() => {
    // ref.current.position.x = el.index * 10;
    ref.current.rotation.y =  - scroll / 400 + 75;
    
  });




  

const camprops = {
  scroll: scroll,
  isVisible: isVisible,
  remove: remove,
  starterValue: starterValue,
}
 
  return (
    
      <group ref={group}>
        <Suspense fallback={<Loader/>}>
        <mesh
          ref={ref}
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[0, -1, 0]}
          castShadow
          scale={1.8}
        >
         
          {/* {audio && <Sound isVisible={isVisible}/>} */}
          
          <a.meshStandardMaterial {...materials.main} />
        </mesh>
        <Camera {...camprops}/>
        {/* <PerspectiveCamera ref={camera} position={el.position} makeDefault={!remove ? true : (!isVisible ? false : true)} /> */}
        </Suspense>
      </group>
  );
}

export default Platform;


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