import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";
import useWindowSize from "../../../../hooks/windowSize";
import { WebGLRenderer } from "three";

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
          camera.current.remove(listener);
          sound.current.setRefDistance(0);
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
      clearTimeout(fadeOut);
      fadeIn();

    }
    if (!isVisible) {
      clearTimeout(fadeIn);
      fadeOut();
     
    }
   return ()=>{
    clearTimeout(fadeIn);
    camera.current.remove(listener);
    }
  }, [isVisible]);

  let vol = sound.current ? sound.current.getRefDistance() : 0;
  
  useEffect(() => {

    sound.current && console.log("station: " + sound.current.getRefDistance())
  }, [vol]);



 
  return (<positionalAudio ref={sound} args={[listener]}/>)
}

const Camera = ({camera, scroll, isVisible, remove, startValue}) => {
const {height} = useWindowSize();
  // Camera animations
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
  const invlerp = (x, y, a) => clamp((a - x) / (y - x));
  const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
  


  useFrame(() => {
    if (!remove) {
    camera.current.position.x =  0;
    camera.current.position.y =  -2;
   
    camera.current.position.z =  range(startValue-height, startValue + height, -10, 90, scroll);
   
   
    camera.current.updateMatrixWorld();
  } 
  });
const cameraProps = {
  ref: camera,
  makeDefault: !remove,
}

  return <PerspectiveCamera {...cameraProps}/>;
};

function Station({ i, el, current, scroll, sectionSize, audio, audioRef }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();
  const camera = useRef();

// IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.sections[0].object);

  // materials.main.map = null;
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


// let texture = materials.main.map
// WebGLRenderer.initTexture = function ( texture ) {

//   if ( texture.isCubeTexture ) {

//     textures.setTextureCube( texture, 0 );

//   } else if ( texture.isData3DTexture ) {

//     textures.setTexture3D( texture, 0 );

//   } else if ( texture.isDataArrayTexture || texture.isCompressedArrayTexture ) {

//     textures.setTexture2DArray( texture, 0 );

//   } else {

//     textures.setTexture2D( texture, 0 );

//   }

//   state.unbindTexture();

// };




// Measure the size of all sections before it and create a start value for scrolling
const [startValue, setStartValue] = useState(0)

useEffect(()=>{
  // Removes all elements in array past index, then adds all of them together
  setStartValue(sectionSize.slice(0, i).reduce((a,b)=> a+b,0))
},[sectionSize])


//SCROLLING ANIMATIONS

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
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[-.2, -4.8, 30]}
          rotation={[.13, -.96, .18]}
          castShadow
          scale={1.8}
        >
         
       
          
         <Sound {...soundprops}/>
          <a.meshStandardMaterial {...materials.main} />
        </mesh>
        <Camera {...camprops}/>
        {/* <Suspense fallback={<Loader/>}> */}
        <ambientLight intensity={.5} />
        <pointLight position={[0, 0, 3]} intensity={.3} />
        <pointLight position={[0, 0, 60]} intensity={.3} />
        {/* <pointLight position={[-5, 0, -3]} intensity={.5}/> */}
        {/* </Suspense> */}
        
        {/* <PerspectiveCamera ref={camera} position={el.position} makeDefault={!remove ? true : (!isVisible ? false : true)} /> */}
      </group>
  );
}

export default Station;

