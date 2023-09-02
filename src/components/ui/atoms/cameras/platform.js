import React from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import useWindowSize from "../../../../hooks/windowSize";

const Platform = ({camera, scroll, remove, starterValue}) => {
  const position = [0, 10, 20]


  // Camera animations
  useFrame(() => {
    // ref.current.position.z = position[2] - (scroll / 10) ;

   camera.current.updateMatrixWorld();
  });
  return <PerspectiveCamera ref={camera} position={position} makeDefault={!remove}/>;
};

  export default Platform;