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
import Loader from "../../molecules/Loader/index";
function Module({}) {
  
  function Scene() {
    const { nodes, materials } = useLoader(GLTFLoader, Cannon);
    const group = useRef();
    console.log(materials.main.map);
    materials.main.map = null;

    return (
      <Suspense fallback={<Loader />}>

          <mesh
            material={materials.main}
            geometry={nodes.mesh.geometry}
            position={[0, 0, 0]}

            castShadow
          ></mesh>
 
      </Suspense>
    );
  }



  return (
    <div id="canvas">
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 70 }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
      >

{/* <pointLight position={[10, 10, 10]} intensity={1.5} /> */}
        <OrbitControls />
        {/* <color attach="background" args={['#f4f4f4']} />
        <fog attach="fog" args={['#f4f4f4', 0, 15]} /> */}

     
          <Scene />
          <Environment preset="city"/>
          <ContactShadows position={[0, -4.5, 0]} scale={20} blur={2} far={4.5} />
  

        
        {/* <mesh position={[0, -1, 2]} rotation={[-1.568, 0, 0]}>
          <cylinderBufferGeometry args={[.05, .05, 100]} />
          <meshBasicMaterial
            
            color="red"
          />
        </mesh> */}

       
        {/* <spotLight intensity={0.3} angle={0.3} penumbra={1} position={[5, 25, 20]} shadow-bias={-0.0001} castShadow />
        <ambientLight intensity={0.5} /> */}




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
