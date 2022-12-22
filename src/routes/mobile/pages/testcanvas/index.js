import React, { useState, useRef, Suspense, useEffect, createRef } from "react";
import "./style.css";
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import {
  a,
  useSpring,
  useSprings,
  useSpringRef,
  useTransition,
} from "@react-spring/three";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Particles } from "../../../../components/ui/molecules/Particles";

import { useControls } from "leva";
import Loader from "../../../../components/ui/molecules/Loader";

function TestCanvas({started, pointLoad, setPointLoad}) {
  const camera = useRef();
  const orbit = useRef();

  const [move, setMove] = useState(6);
  // const props = useControls({

  //   focus: { value: 5.1, min: 3, max: 7, step: 0.01 },
  //   // speed: { value: 11, min: 0.1, max: 100, step: 0.1 },
  //   speed: { value: .1, min: 0.1, max: 100, step: 0.1 },
  //   // aperture: { value: 5.3, min: 1, max: 5.6, step: 0.1 },
  //   aperture: { value: 1.3, min: 1, max: 5.6, step: 0.1 },
  //   fov: { value: 70, min: 0, max: 200 },
  //   curl: { value: 0.30, min: 0.01, max: 0.5, step: 0.01 }

  // })

  // 25 FOV
  // const props = {
  //   focus: 5.1 ,
  //   speed: 0.1 ,
  //   aperture: 1.3,
  //   fov: 70,
  //   curl: 0.3 ,
  // };
  // 75 FOV
  const props = {
    focus: 5.1 ,
    speed: 0.1 ,
    aperture: 4.3,
    fov: 70,
    curl: 0.3 ,
  };

  const camprops = {
    camera: camera,
  };

  const particles = {
    move: move,
    orbit: orbit.current,
    pointLoad: pointLoad,
    setPointLoad: setPointLoad,
  }

  return (
    <div id="testcanvas" onClick={() => setMove(move - 2)}>
      <Suspense fallback={console.log("loading")}>
      <Canvas
        linear={true}
        camera={{ fov: 75, position: [0, 0, 7]}}
        gl={{
          antialias: true,
          alpha: true,
          pixelRatio: window.devicePixelRatio,
        }}
      >
        {/* zoomSpeed={0.1} */}
        {/* <ambientLight intensity={0.5} /> */}
        {/* autoRotate autoRotateSpeed={0.5} */}

        <OrbitControls
          ref={orbit}
          makeDefault
          autoRotate
          autoRotateSpeed={0.5}
          zoomSpeed={0.1}
          enableZoom={false}
        />

     
      
        <Particles {...particles} {...props} />
        
      </Canvas>
      </Suspense>
    </div>
  );
}

export default TestCanvas;
