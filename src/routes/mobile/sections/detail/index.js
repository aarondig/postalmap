import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  softShadows,
} from "@react-three/drei";
import { a, useSpring } from "react-spring";
import { useGLTF } from "@react-three/drei";
import { InView } from "react-intersection-observer";
import Loader from "../../pages/Loader";

function Detail({
  i,
  el,
  section,
  sectionSize,
  setVisibleSection,
  scrollContainer,
  scroll,
  data
}) {
  const orbit = useRef();

  const [isVisible, setIsVisible] = useState(false);
  const [inView, setInView] = useState(false);


  useEffect(() => {
    inView && setVisibleSection(i);
  }, [inView]);

  const visible = useSpring({
    opacity: inView ? 1 : 0,
    // delay: 100,
    config: { duration: 250 },
  });

  function Scene({ orbit, scroll }) {
    const ref = useRef();


    // const { nodes, materials } = useLoader(GLTFLoader, el.object);
    const { nodes, materials } = useGLTF(el.object);

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
    
    // const [scale,setScale] = useState()
    const [position,setPosition] = useState()
    const [rotation, setRotation] = useState(0)
   

    useFrame(() => {
      if (isVisible) {
        if (ref.current !== undefined) {
      ref.current.rotation.y = scroll / 800 ;
        }
    }
    // if (orbit.current) {
    //   orbit.current.target = ref.current.geometry.boundingSphere.center;
    //   orbit.current.update();
    // }
 
    });
    
    useEffect(()=>{
      if (ref.current !== undefined) {

      
      if (el.id) {
        
        ref.current.position.y = -1;
       
        // setRotation(.8)
      }
      if (el.id === "pierpay") {
        // setScale(7.2)
        let scale = 3.2;
        ref.current.scale.x = scale;
        ref.current.scale.y = scale;
        ref.current.scale.z = scale;
      
        ref.current.position.x = 1.2;
        ref.current.position.y = -.4;
        
        
        // setRotation(11.6)
      }
      if (el.id === "cannon") {
        let scale = 6.5;
        ref.current.scale.x = scale;
        ref.current.scale.y = scale;
        ref.current.scale.z = scale;
        // setScale(2.5)
        ref.current.position.y = -1;
        // setRotation(-.8)
      } 
      if (el.id === "platform") {
        // setScale(1.8)
        let scale = 1.8;
        ref.current.scale.x = scale;
        ref.current.scale.y = scale;
        ref.current.scale.z = scale;
        ref.current.position.y = -1;
      } 
      if (el.id === "embstation") {
        // setScale(.5)
        let scale = .5;
        ref.current.scale.x = scale;
        ref.current.scale.y = scale;
        ref.current.scale.z = scale;
        ref.current.position.y = -2;
      } 
    }
    
    },[])



    const mesh = {
      ref: ref,
      material: materials.main !== undefined ? materials.main : materials[""],
      geometry: nodes.mesh !== undefined ? nodes.mesh.geometry : nodes.mesh_0.geometry,
      // position: position,
      // scale: scale,
    
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
          camera={{ position: [0, 1.5, 7], fov: 50 }}
          gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
          shadows
        >
          <pointLight position={[4, 5, 4]} intensity={1.2} />
          <pointLight position={[0, -30, -10]} intensity={.8} />
          <OrbitControls ref={orbit} {...orbitcontrols}/>
          {isVisible && <Scene orbit={orbit} scroll={scroll} />}
        </Canvas> 
      </div>
      </InView>
    </InView>
  );
}

export default Detail;
