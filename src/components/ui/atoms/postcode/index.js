import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import sidewalk from "../../../../assets/audio/sidewalk.m4a"
import { lerp } from "three/src/math/MathUtils";

function Sound({ el, audio, camera, remove }) {
  const sound = useRef()
  const [listener] = useState(() => new THREE.AudioListener())
  const buffer = useLoader(THREE.AudioLoader, sidewalk)
  useEffect(() => {
    sound.current.setBuffer(buffer)
    sound.current.setRefDistance(1)
    sound.current.setLoop(true)
    // sound.current.setRolloffFactor()
    camera.current.add(listener)
    // sound.current.setVolume(0);
    // sound.current.play();
// console.log(sound.current.getVolume())
  
    // let volume = 0;

    // setInterval(function() {

    // }, 1000);
    // for (let index = 0; index < 100; index++) {
    //   volume += .01
      
    //   sound.current.setVolume(volume)
    // }
    // console.log(sound.current.getVolume())
    
    // return () => {
    //   camera.current.remove(listener)
     
    // }
  }, [])

  // const { setVolume } = useSpring({ setVolume: remove ? 0 : 1, onRest: () => remove &&  sound.current.pause()});

useEffect(()=>{

if (audio){
  sound.current.play();
}
if (!audio){
  sound.current.pause();
}
},[audio])


  useEffect(()=>{
    if (!remove) {
      sound.current.play();
    }
    // if (remove) {
    //   sound.current.pause();
    // }


  },[remove])
  // sound.current && console.log(sound.current.panner.orientationZ.value)
  // sound.current && console.log(sound.current)
 
  return <positionalAudio ref={sound} args={[listener]} setVolume={1}/>
}

const Camera = ({camera, scroll, remove, starterValue}) => {
  const position = [0, 10, 75]
  

  // Camera animations
  useFrame(() => {
    camera.current.position.z = position[2] - (scroll / 10) ;

    camera.current.updateMatrixWorld();
  });
  return <PerspectiveCamera ref={camera} position={position} makeDefault={!remove}/>;
};

function Postcode({ i, el, current, scroll, starterValue, audio }) {
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

  const { visible } = useSpring({ visible: remove ? false : true });
  materials.main.visible = visible;

  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0, onRest: () => current !== el.index && setRemove(true) });
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

//SCROLLING ANIMATIONS
// const [positionz, setPositionz] = useState();


  useFrame(() => {
    // ref.current.position.x = el.index * 10;
    ref.current.rotation.y =  - scroll / 400 + 75;
    
    
  });



  

const camprops = {
  camera: camera,
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
          
           
          <Sound el={el} audio={audio} camera={camera} remove={remove}/>
          <a.meshStandardMaterial {...materials.main} />
        </mesh>
        <Camera {...camprops}/>
        </Suspense>
      </group>
  );
}

export default Postcode;