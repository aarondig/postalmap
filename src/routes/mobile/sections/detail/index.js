import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import { data } from "../../../../data";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  softShadows,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { a, useSpring } from "react-spring";

import { InView } from "react-intersection-observer";
import Loader from "../../pages/Loader";

function Detail({
  i,
  el,
  section,
  sectionSize,
  setCurrent,
  scrollContainer,
  scroll,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    inView && setCurrent(i);
  }, [inView]);

// Measure the size of all sections before it and create a start value for scrolling
const [startValue, setStartValue] = useState(0)

useEffect(()=>{
  // Removes all elements in array past index, then adds all of them together
 setStartValue((sectionSize.slice(-(i)).reduce((a, b) => a + b, 0) - 98))
},[sectionSize])

  const visible = useSpring({
    opacity: inView ? 1 : 0,
    // delay: 100,
    config: { duration: 250 },
  });

  function Scene({ scroll, startValue }) {
    const ref = useRef();

    const { nodes, materials } = useLoader(GLTFLoader, el.object);
    

    useEffect(()=>{
      if (materials.main !== undefined) {
        materials.main.map = null;
        materials.main.color = new THREE.Color(0x404040);
        materials.main.transparent = true;
      } 
      if (materials[""] !== undefined) {
        materials[""].map = null;
        materials[""].color = new THREE.Color(0x404040);
        materials[""].transparent = true;
      }
    },[])
    
    const [scale,setScale] = useState()
    const [position,setPosition] = useState()
    const [rotation, setRotation] = useState(0)
   

    useFrame(() => {
      if (isVisible) {
      ref.current.rotation.y = (scroll - startValue) / 800 + rotation;
    }
    });
    
    useEffect(()=>{
      if (el.id) {
        // setScale(1.2)
        setPosition([0,-1,0])
        setRotation(.8)
      }
      if (el.id === "pierpay") {
        setScale(7.2)
        setPosition([1.2,-.4,0])
        setRotation(11.6)
      }
      if (el.id === "cannon") {
        setScale(2.5)
        setPosition([0,-1,0])
        setRotation(-.8)
      } 
      if (el.id === "platform") {
        setScale(1.8)
        setPosition([0,-1,0])
      } 
      if (el.id === "embstation") {
        setScale(.5)
        setPosition([0,-2,0])
      } 
    
    
    },[])



    const mesh = {
      ref: ref,
      material: materials.main !== undefined ? materials.main : materials[""],
      geometry: nodes.mesh !== undefined ? nodes.mesh.geometry : nodes.mesh_0.geometry,
      position: position,
      scale: scale,
    
    }


    return (
      <Suspense fallback={<Loader/>}>
        <mesh
          
          {...mesh}
          
        >
    
        </mesh>
      </Suspense>
    );
  }

const orbitcontrols = {
  maxDistance: 6,
  minDistance: 2,
  // enablePan: false,
}

  return (
    <InView id="detail" ref={section} onChange={setIsVisible} >
      <InView onChange={setInView} threshold={0.6} >
      {/* style={visible} */}
      {/* <div className="background-c">
      <div className="background"></div>
      </div> */}
      <div className="section-wrap">
        <div className="col-3">
          <a.div className="text-c" style={visible}>
            <h6 className="subtitle">{el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
            <p className="text">{el.text}</p>
          </a.div>
        </div>
        <div className="col-2"></div>
      </div>
      <div className="canvas-wrap" style={data[i+1].type === "slider" || data[i+1].lightMode === "light" ? {paddingBottom: "80px"} : {paddingBottom: "0px"}}>
        <Canvas
          camera={{ position: [0, 1.5, 7], fov: 70 }}
          gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
          shadows
        >
          <pointLight position={[4, 5, 4]} intensity={1.2} />
          <pointLight position={[0, -30, -10]} intensity={0.6} />
          <OrbitControls {...orbitcontrols}/>
          {/* <rectAreaLight position={[0, 20, 40]} intensity={50} width={200}
      height={1}/> */}
          <Scene scroll={scroll} startValue={startValue} />
        </Canvas>
      </div>
      </InView>
    </InView>
  );
}

export default Detail;
