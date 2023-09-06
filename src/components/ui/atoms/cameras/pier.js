import React from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import useWindowSize from "../../../../hooks/windowSize";

const Pier = ({camera, isVisible, scroll, remove, startValue}) => {

  
const position = [0,0, 0]
  
  const {height} = useWindowSize()
  
    // Camera animations
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    const invlerp = (x, y, a) => clamp((a - x) / (y - x));
    const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
  
    useFrame(() => {
     if (!remove) {
      camera.current.position.z = range(startValue-height, startValue + height, 0, 34, scroll);
      camera.current.rotation.y = range(startValue-height, startValue + height, -.1, 1.2, scroll) ;
      camera.current.updateMatrixWorld();
    }
    });
  const cameraProps = {
    ref: camera,
    position: position,
    makeDefault: isVisible,
  }
  
    return <PerspectiveCamera {...cameraProps}/>;
};
  

  export default Pier;