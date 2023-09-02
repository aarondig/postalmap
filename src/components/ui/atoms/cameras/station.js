import React, { useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import useWindowSize from "../../../../hooks/windowSize";
import { a } from "@react-spring/three";

const Station = forwardRef(function ({camera, isVisible, scroll, remove, startValue}, ref) {


// useEffect(()=>{
//   materials.main.color = new THREE.Color(0x4f4f51);
//   materials.main.transparent = true;
//   materials.main.needsUpdate = true;
//   materials.main.opacity = opacity;

// if (ref.current !== undefined) {
//   ref.current.position = [-.2, -4.8, 30];
//   ref.current.rotation = [.13, -.96, .18];
//   ref.current.castShadow = true;
//   ref.current.scale = 1.8;
// }
 
  
// },[])



  
  const Camera = ({camera, scroll, isVisible, remove, startValue}) => {
    const {height} = useWindowSize();
    // Camera animations
    const lerp = (x, y, a) => x * (1 - a) + y * a;
    const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
    const invlerp = (x, y, a) => clamp((a - x) / (y - x));
    const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));
    
    useFrame(() => {
      if (!remove) {
      camera.current.position.x =  0;
      camera.current.position.y =  -2;
      camera.current.position.z =  range(startValue-height, startValue + height, -10, 90, scroll);
      camera.current.updateMatrixWorld();
    } 
    });
  const cameraProps = {
    ref: camera,
    makeDefault: isVisible,
  }
  
    return <PerspectiveCamera {...cameraProps}/>
    
  };
  const camprops = {
    camera: camera,
    scroll: scroll,
    isVisible: isVisible,
    remove: remove,
    startValue: startValue,
  };
  return <group>

  {/* <mesh ref={ref}>
    <a.meshStandardMaterial {...materials.main} />
  </mesh> */}
  <Camera {...camprops}/>
  <ambientLight intensity={.5} />
  <pointLight position={[0, 0, 3]} intensity={.3} />
  <pointLight position={[0, 0, 60]} intensity={.3} />
</group>
  })
 
  

  export default Station;