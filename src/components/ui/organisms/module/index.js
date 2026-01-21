import React, { Suspense } from "react";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import Scenes from "../../molecules/scenes";
import Loader from "../../molecules/Loader";
import { Preload } from "@react-three/drei";

function Module({
  i,
  el,
  scroll,
  direct,
  current,
  isInView,
  sectionSize,
  audio,
}) {
  const scenes = {
    i: i,
    el: el,
    scroll: scroll,
    direct: direct,

    current: current,
    isInView: isInView,
    sectionSize: sectionSize,

    audio: audio,
  };

  const canvas = {
    id: "canvas",
    className: "module",
  };

  return (
    <div {...canvas}>
      <Canvas
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
        shadows
        frameloop="demand"
      >
        <rectAreaLight
          position={[0, 20, 40]}
          intensity={90}
          width={200}
          height={1}
        />

        <fog attach="fog" args={["#17171b", 40, 80]} />
        {/* <Suspense fallback={<Loader />}> */}
          <Scenes {...scenes} />
         <Preload all/>
        {/* </Suspense> */}
      </Canvas>
    </div>
  );
}

export default Module;
