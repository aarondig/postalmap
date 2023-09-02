import React, { useEffect, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { a } from "@react-spring/three";

const Postcode = forwardRef(function (
  { camera, isVisible, scroll, remove, startValue },
  ref
) {
//   useEffect(() => {
//     materials.main.color = new THREE.Color(0x4f4f51);
//     materials.main.transparent = true;
//     materials.main.needsUpdate = true;
//     materials.main.opacity = opacity;

//     if (ref.current !== undefined) {
//       ref.current.position = [-0.2, -4.8, 30];
//       ref.current.rotation = [0.13, -0.96, 0.18];
//       ref.current.castShadow = true;
//       ref.current.scale = 1.8;
//     }
//   }, []);

  // Camera animations
  useFrame(() => {
    if (!remove) {
      camera.current.position.x = -2;
      camera.current.position.y = 2;
      camera.current.position.z = (startValue - scroll) / 25 + 60;

      camera.current.updateMatrixWorld();
    }
  });

  const cameraprops = {
    ref: camera,
    makeDefault: isVisible,
  };

  return (
    <group>
      {/* <mesh ref={ref}>
        <a.meshStandardMaterial {...materials.main} />
      </mesh> */}

      <PerspectiveCamera {...cameraprops} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 3]} intensity={0.3} />
      <pointLight position={[0, 0, 60]} intensity={0.3} />
    </group>
  );
});

export default Postcode;
