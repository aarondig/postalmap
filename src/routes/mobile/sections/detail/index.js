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
    const [modelLoaded, setModelLoaded] = useState(false);
    const [scale, setScale] = useState(1);
    
    // Load the model with error handling
    const { nodes, materials } = useGLTF(el.object, undefined, (gltf) => {
      setModelLoaded(true);

      // Calculate scale based on model size
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      setScale(5 / maxDim); // Scale to fit within 5 units
      
      // Apply materials
      if (materials) {
        Object.values(materials).forEach(material => {
          material.map = null;
          material.color = new THREE.Color(0x00ffff); // Brighter cyan color
          material.wireframe = true;
          material.transparent = true;
          material.opacity = 1;
          material.needsUpdate = true;
        });
      }
    });
    
    const [bbox, setBbox] = useState(null);
    const [center, setCenter] = useState(new THREE.Vector3());
    const [size, setSize] = useState(new THREE.Vector3());

    useEffect(() => {
      if (ref.current) {
        const box = new THREE.Box3().setFromObject(ref.current);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        
        // Center the model
        ref.current.position.x = -center.x;
        ref.current.position.y = -center.y;
        ref.current.position.z = -center.z;
        
        // Scale to fit
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim; // Adjust scale factor as needed
        ref.current.scale.set(scale, scale, scale);
        
        setBbox(box);
        setCenter(center);
        setSize(size);
      }
    }, [nodes]);

    useFrame(() => {
      if (isVisible && ref.current) {
        ref.current.rotation.y = scroll / 500; // Slower rotation
      }
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
        // let scale = 6.5;
        // ref.current.scale.x = scale;
        // ref.current.scale.y = scale;
        // ref.current.scale.z = scale;

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



    // Check if we have valid geometry
    let geometry;
    let modelGroup = null;
    
    if (nodes.scene) {
      // If the model is a scene, use its children
      modelGroup = nodes.scene;
    } else if (nodes.mesh) {
      // If it's a direct mesh
      geometry = nodes.mesh.geometry;
    } else if (nodes.mesh_0) {
      // Alternative mesh name
      geometry = nodes.mesh_0.geometry;
    } else if (Object.keys(nodes).length > 0) {
      // Try to find any geometry in the nodes
      const nodeKey = Object.keys(nodes).find(key => nodes[key].geometry);
      if (nodeKey) geometry = nodes[nodeKey].geometry;
    }

    if (!geometry && !modelGroup) {
      return (
        <group>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" wireframe />
          </mesh>
        </group>
      );
    }
    
    return (
      <Suspense fallback={<Loader/>}>
        <group>
          {modelGroup ? (
            <primitive 
              object={modelGroup} 
              ref={ref}
              scale={[scale, scale, scale]}
              position={[0, 0, 0]}
            />
          ) : (
            <mesh 
              ref={ref} 
              geometry={geometry} 
              scale={[scale, scale, scale]}
            >
              <meshBasicMaterial 
                color={0xf0f0f0} 
                wireframe={true}
                transparent={true}
                opacity={1}
              />
            </mesh>
          )}
        </group>
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
          camera={{ position: [0, 1.5, 3], fov: 45, near: 0.1, far: 1000 }}
          gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
          shadows
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} />
          <pointLight position={[0, 10, 0]} intensity={1} distance={20} decay={2} />
          <OrbitControls 
            ref={orbit}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={20}
            autoRotate={false}
            autoRotateSpeed={0.5}
          />
          {isVisible && <Scene orbit={orbit} scroll={scroll} />}
        </Canvas>
      </div>
      </InView>
    </InView>
  );
}

export default Detail;
