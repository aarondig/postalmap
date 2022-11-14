import React, { useState, useRef, Suspense } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  softShadows
} from "@react-three/drei";
import { MeshBasicMaterial, SphereBufferGeometry } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Cannon from "../../../../assets/scans/Cannon.glb";
import postalcode from "../../../../assets/scans/postalcode.glb";
import train from "../../../../assets/scans/train.glb";
import corner from "../../../../assets/scans/corner.glb";
import riverside from "../../../../assets/scans/riverside.glb";
import Loader from "../Loader/index";
function Module({scroll, current}) {
  
  function Scene({scroll}) {
    const ref = useRef();
    const { nodes, materials } = useLoader(GLTFLoader, postalcode);
    
    materials.main.map = null;
    materials.main.color = new THREE.Color(0x404040)
    // materials.main.color = new THREE.Color(0xffffff)
    useFrame(() => {
      ref.current.rotation.y = -700 + scroll / 200;
    })
    return (
      <Suspense fallback={<Loader />}>

          <mesh
            ref={ref}
            material={materials.main}
            geometry={nodes.mesh.geometry}
            position={[0, -1, 0]}
            castShadow
            scale={1.8}
          >
          </mesh>
 
      </Suspense>
    );
  }



  return (
    <div id="canvas">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 70 }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
      >

        <pointLight position={[4, 2, 4]} intensity={1} />
        <pointLight position={[-5, 0, -3]} intensity={.3} />
        <OrbitControls />


     
          <Scene scroll={scroll}/>
          {/* <Environment preset="city"/> */}
  

        
        {/* <mesh position={[0, -1, 2]} rotation={[-1.568, 0, 0]}>
          <cylinderBufferGeometry args={[.05, .05, 100]} />
          <meshBasicMaterial
            
            color="red"
          />
        </mesh> */}

       
        {/* <spotLight intensity={0.3} angle={0.3} penumbra={1} position={[5, 25, 20]} shadow-bias={-0.0001} castShadow />
        <ambientLight intensity={10} /> */}



        {/* <hemisphereLight
          color="#ffffff"
          groundColor="#707070"
          position={[0, 25, -30]}
          intensity={0.85}
          castShadow
        /> */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shadowMaterial attach="material" transparent opacity={0.4} />
      </mesh> */}
      </Canvas>
    </div>
  );
}

export default Module;
