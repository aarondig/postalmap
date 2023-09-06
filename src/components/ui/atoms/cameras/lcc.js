import React from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import useWindowSize from "../../../../hooks/windowSize";

const Lcc = ({camera, isVisible, scroll, remove, startValue}) => {


  // Camera animations
  useFrame(() => {
    if (!remove) {
    camera.current.position.x =  -2;
    camera.current.position.y =  2;
    // ref.current.position.z =  ((scroll - startValue)/10) - 50;
    camera.current.position.z =  ((startValue - scroll )/25) + 60;
    
    camera.current.updateMatrixWorld();
    }
  });
const cameraprops = {
  ref: camera,
  makeDefault: isVisible,
}

  return <PerspectiveCamera {...cameraprops}/>;
};

  export default Lcc;