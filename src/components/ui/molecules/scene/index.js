import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import postalcode from "../../../../assets/scans/postalcode.glb";
import train from "../../../../assets/scans/train.glb";
import corner from "../../../../assets/scans/corner.glb";
import riverside from "../../../../assets/scans/riverside.glb";
import Loader from "../Loader/index";
import { data } from "../../../../data";
import { useSpring, a } from "@react-spring/three";
import { PositionalAudio } from "@react-three/drei";

function Scene({ i, el, current, scroll, audio, setScene }) {
  const ref = useRef();
  const group = useRef();
  const aud = useRef();

  // Checks if the scene is Visible
  const [isVisible, setIsVisible] = useState(el.index === 0 ? true : false);

// IMPORT MODEL
  const { nodes, materials } = useLoader(GLTFLoader, el.object);

  materials.main.map = null;
  materials.main.color = new THREE.Color(0x404040);
  materials.main.transparent = true;

  useFrame(() => {
    // ref.current.position.x = el.index * 10;
    ref.current.rotation.y = -700 + scroll / 200;
  });
  const [remove, setRemove] = useState(false);

 
  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0, onRest: () => current !== el.index && (materials.main.visible = false) });
  materials.main.opacity = opacity;
  // const { visible } = useSpring({ visible: remove ? false : true });
  // materials.main.visible = visible;

// STARTUP

  useEffect(() => {
    if (current === el.index) {
      materials.main.visible = true;
      setIsVisible(true);
      
      // setScene(el.index)

    } else {
      setIsVisible(false);
    }
  }, [current]);
  
 



  // if (materials.main.opacity === 0) {
  //   materials.main.opacity = opacity;
  // }

  // onRest: () => navigate(`projects`)



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


  
  return (
    <Suspense fallback={<Loader />}>
      <group ref={group}>
        <mesh
          ref={ref}
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[0, -1, 0]}
          castShadow
          scale={1.8}

          // visible={visible}
        >
         
          {/* {audio && <Sound isVisible={isVisible}/>} */}
          
          <a.meshStandardMaterial {...materials.main} />
        </mesh>
      </group>
    </Suspense>
  );
}

export default Scene;
