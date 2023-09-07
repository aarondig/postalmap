import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import { useFrame, } from "@react-three/fiber";
import * as THREE from "three";
import {
  useSpring,
  a as Animated,
} from "@react-spring/three";
import { useGLTF, Float } from "@react-three/drei";

import Loader from "../../../../components/ui/molecules/Loader";

function Model({ orbit, model, el, i, current }) {
  const group = useRef();

  const [remove, setRemove] = useState(false);


  // Loading Models
  const { nodes, materials } = useGLTF(el.object)

  const { opacity } = useSpring({
    opacity: current === i ? 1 : 0,
    onRest: () => current !== i && setRemove(true),
  });

  materials.main.visible = false;
  materials.main.map = null;
  materials.main.color = new THREE.Color(0x404040);
  materials.main.transparent = true;
  materials.main.opacity = opacity;

  // Creates Opacity Transition
  if (materials.main !== undefined) {
  materials.main.visible = i === current ? true : remove && false;
  }


  useFrame((state) => {
    if (i === current) {
      if (orbit.current !== undefined) {
        orbit.current.target.lerp(
          nodes.mesh.geometry.boundingSphere.center,
          0.01
        );
        orbit.current.update();
      }
    } 
  });
  useEffect(() => {

    if (i === current) {
      //Sets Loading True for Model
      // setLoad(true);
      //Resets Orbit Controls on mount
      if (orbit.current !== undefined) {
        orbit.current.reset();
      }
      
    }
    
  }, [current]);
 



  return (
    <group ref={group} position={[0, el.posiY, 0]} scale={el.scale}>
      <Float
        speed={1.2} // Animation speed, defaults to 1
        rotationIntensity={0.8} // XYZ rotation intensity, defaults to 1
        floatIntensity={0.4} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        floatingRange={[0, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Suspense key={i} fallback={<Loader />}>
        <mesh
          ref={model}
          geometry={nodes.mesh.geometry}
        >
          <Animated.meshStandardMaterial
            {...(materials.main)}
          />
        </mesh>
        </Suspense>
      </Float>
    </group>
  );
}


export default Model;
