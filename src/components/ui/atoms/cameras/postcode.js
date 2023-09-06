import React, { useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { a } from "@react-spring/three";
import useWindowSize from "../../../../hooks/windowSize";

function Postcode({ camera, isVisible, scroll, remove, startValue }){
 
  const Camera = ({ camera, isVisible, startValue, scroll, remove,   }) => {

    const {height} = useWindowSize();
  // Camera animations
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    const invlerp = (x, y, a) => clamp((a - x) / (y - x));
    const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
    useFrame(() => {
  if (!remove) {
  
      camera.current.position.z = range(startValue - height, startValue + height, -4, 6, scroll );
      camera.current.position.y = range(startValue - height, startValue + height, 10, -.5, scroll );
      camera.current.rotation.y = range(startValue-height, startValue + height, .705, -.2, scroll) ;
      camera.current.rotation.x = range(startValue-height, startValue + height, -.28, .1, scroll) ;
  
  
      camera.current.updateMatrixWorld();
    }
    });
    return (
      <PerspectiveCamera
        ref={camera}
        makeDefault={isVisible}
      ></PerspectiveCamera>
    );
  };


//   useFrame(() => {
//     if (!remove) {
//       camera.current.position.x = -2;
//       camera.current.position.y = 2;
//       camera.current.position.z = (startValue - scroll) / 25 + 60;

//       camera.current.updateMatrixWorld();
//     }
//   });

  const cameraprops = {
    camera: camera,
    startValue: startValue,
    remove: remove,
    scroll: scroll,
    makeDefault: isVisible,
  };

  return (
    <group>


      <Camera {...cameraprops}/>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={0.3} />
      <pointLight position={[0, 0, 60]} intensity={0.3} />
    </group>
  );
}

export default Postcode;
