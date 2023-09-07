import React, { useRef, Suspense } from "react";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import {easings } from "react-spring";
import {
  useSpring,
  a as Animated,
} from "@react-spring/three";
import { data } from "../../../../data";
import { OrbitControls, Preload, AdaptiveDpr } from "@react-three/drei";

import Loader from "../../../../components/ui/molecules/Loader";

const Model = React.lazy(() => import("./model"));


function Scene({ models, current, loaded, setLoaded }) {
  const orbit = useRef();
  const group = useRef();

  const model = {
    orbit: orbit,
    current: current,
  };

  let count = 0;

  const { scale } = useSpring({
    scale: loaded ? 1 : 0,
    delay: 200,
    config: {
      easing: easings.easeInOutExpo,
      duration: 1200,
    },
  });



  return (
    <div id="canvas" className="home">
      <Canvas
      // camera={{ position: [0, 1.8, 6.4], fov: 25 }}
      
        camera={{ position: [0, 1.8, 7], fov: 50 }}
        gl={{ antialias: true }}
        frameloop="demand"
        // flat={true}
        // dpr={[.1, 1]}
      >
        <fog attach="fog" args={["black", 0, 20]} />
        <pointLight position={[0, 1, 4]} intensity={0.2} />
   
        <directionalLight position={[0, .2, 0]} intensity={1.2} />
        <Animated.group ref={group} scale={scale}>
          {data.map((el, i) => {
            if (el.type === "view") {
              return (
                <Suspense key={i} fallback={<Loader setLoaded={setLoaded}/>}>
                  <Model
                    el={el}
                    i={count++}
                    model={models[i]}
                    {...model}
                  />
                  
                </Suspense>
              );
            }
          })}
        </Animated.group>

        <OrbitControls ref={orbit} autoRotate autoRotateSpeed={.4}/>
        <AdaptiveDpr pixelated/>
        <Preload all/>
      </Canvas>
    </div>
  );
}


export default Scene;
