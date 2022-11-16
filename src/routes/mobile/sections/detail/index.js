import React, {
  useState, useRef, Suspense, useEffect
} from "react";
import "./style.css";
import {data} from "../../../../data"
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  ContactShadows,
  Environment,
  softShadows
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {a, useSpring } from "react-spring";

import { InView } from "react-intersection-observer";

function Detail({i, el, section, setCurrent, scrollContainer, scroll}) {
  const [inView, setInView] = useState(false);

  useEffect(()=>{
    inView && setCurrent(i)
  },[inView])


  const visible = useSpring({ opacity: inView ? 1 : 0,
    delay: 400,
  config: { duration: 250 } })


  
  function Scene({scroll}) {
    const ref = useRef();

    const { nodes, materials } = useLoader(GLTFLoader, el.object);
    
    materials.main.map = null;
    materials.main.color = new THREE.Color(0x404040)
    
    useFrame(() => {
      ref.current.rotation.y = -700 + scroll / 200;
    })
    return (
      <Suspense fallback={null}>

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


  

  return <div id="detail" ref={section} >
    <InView onChange={setInView}>
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
        <div className="col-2">
          
      </div>
      
   
      </div>
      <div className="canvas-wrap">
    
    <Canvas
  camera={{ position: [0, 1.5, 7], fov: 70 }}
  gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
  shadows
>

  <pointLight position={[4, 2, 4]} intensity={1} />
  <pointLight position={[-5, 0, -3]} intensity={.3} />
  <OrbitControls />



    <Scene scroll={scroll}/>
    
</Canvas>


  </div>
      </InView>
  </div>
}

export default Detail;

