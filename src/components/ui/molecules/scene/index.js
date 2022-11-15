import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import postalcode from "../../../../assets/scans/postalcode.glb";
import train from "../../../../assets/scans/train.glb";
import corner from "../../../../assets/scans/corner.glb";
import riverside from "../../../../assets/scans/riverside.glb";
import Loader from "../Loader/index";
import {data} from "../../../../data"
import { useSpring, a } from '@react-spring/three'
import { meshPhongMaterial, meshStandardMaterial } from "@react-three/fiber";

function Scene({current, scroll, i}) {
  const ref = useRef();

  // Checks if the scene is Visible
  const [isVisible, setIsVisible] = useState(false)
  useEffect(()=>{
    if (current === i) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  },[current])


  const { nodes, materials } = useLoader(GLTFLoader, data[i].object);

  // new THREE.MeshStandardMaterial({color: 0xff0000})

  materials.main.map = null;
  materials.main.color = new THREE.Color(0x404040);
  materials.main.transparent = true;


  useFrame(() => {
    ref.current.rotation.y = -700 + scroll / 200;
    
  })

  // const { position } = useSpring({ position: isVisible ? [0,-1,0] : [i+4,5,0]})
  const { scale } = useSpring({ scale: isVisible ? 1.8 : 0})



  const { visible } = useSpring({ visible: isVisible ? true : false})
  const { opacity } = useSpring({ opacity: isVisible ? 1 : 0})
  materials.main.opacity = opacity;
  

  // if (materials.main.opacity === 0) {
  //   materials.main.opacity = opacity;
  // }


  return (
    <Suspense fallback={<Loader />}>

        <mesh
          ref={ref}
          // material={materials.main}
          geometry={nodes.mesh.geometry}
          position={[0,-1,0]}
          castShadow
          scale={1.8}

          // visible={visible}

        >
          <a.meshStandardMaterial  {...materials.main}/>
        </mesh>

    </Suspense>
  );
}

export default Scene;
