import React, { useState, useRef, Suspense, useEffect, createRef } from "react";
import "./style.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useControls } from "leva";

// import {
//   a,
//   useSpring,
//   useSprings,
//   useSpringRef,
//   useTransition,
// } from "react-spring";
import { a, easings } from "react-spring";
import {
  useSpring,
  useSprings,
  useSpringRef,
  useChain,
  a as Animated,
} from "@react-spring/three";
import { data } from "../../../../data";
import { OrbitControls, Plane, Float } from "@react-three/drei";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Particles } from "../../../../components/ui/molecules/Particles";
import { Vector3 } from "three";
import Loader from "../../../../components/ui/molecules/Loader";
import { useSwipeable } from "react-swipeable";

function Model({ orbit, model, el, i, current }) {
  const group = useRef();

  const [remove, setRemove] = useState(false);
  const { nodes, materials } = useLoader(GLTFLoader, el.object);

  const { opacity } = useSpring({
    opacity: current === i ? 1 : 0,
    onRest: () => current !== i && setRemove(true),
  });
  useEffect(() => {
    if (materials.main !== undefined) {
      // materials.main.map = null;
      // materials.main.color = new THREE.Color(0xdadada);
      materials.main.color = new THREE.Color(0xeeeeee);
      // materials.main.color = new THREE.Color(0x404040);
      // materials.main.color = new THREE.Color(0x909090);
      materials.main.transparent = true;
      materials.main.opacity = opacity;
      materials.main.visible = false;
      
    }
    if (materials[""] !== undefined) {
      materials[""].map = null;
      materials[""].color = new THREE.Color(0x404040);
      materials[""].transparent = true;
      materials[""].opacity = opacity;
    }
  },[])
  // Creates Opacity Transition
  if (materials.main !== undefined) {
  materials.main.visible = i === current ? true : remove && false;
  }


  useFrame(() => {
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
        <mesh
          ref={model}
          geometry={
            nodes.mesh !== undefined
              ? nodes.mesh.geometry
              : nodes.mesh_0.geometry
          }
        >
          <Animated.meshStandardMaterial
            {...(materials.main !== undefined ? materials.main : materials[""])}
          />
        </mesh>
      </Float>
    </group>
  );
}

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
      camera={{ position: [0, 1.8, 6.4], fov: 25 }}
        // camera={{ position: [0, 1.8, 7], fov: 25 }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
      >
        {/* <fog attach="fog" args={["white", 0, 15]} /> */}
        <fog attach="fog" args={["black", 0, 20]} />
        <pointLight position={[0, 5, 7]} intensity={0.2} />
        {/* <pointLight position={[0, -30, -10]} intensity={0.1}/> */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 1, 0]} intensity={0.8} />
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

        <OrbitControls ref={orbit} />
      </Canvas>
    </div>
  );
}

function Home({ current, setCurrent, basename }) {
  //Startup Function
  const [loaded, setLoaded] = useState(false);

  let modelcount = [];
  const [models, setModels] = useState([]);

  useEffect(() => {
    //Setting Grouped Refs

    {
      data.map((el, i) => {
        let count = 0;
        if (el.type === "view") {
          modelcount.push(count + 1);
        }
      });
    }
    setModels((models) =>
      Array(modelcount.length)
        .fill()
        .map((el, i) => models[i] || createRef())
    );
    setLoaded(true);
  }, []);

  //Selecting Page
  const handleNext = () => {
    if (current >= models.length - 1) {
      setCurrent(0);
    }
    if (current < models.length - 1) {
      setCurrent(current + 1);
    }
  };
  const handlePrev = () => {
    if (current <= 0) {
      setCurrent(models.length - 1);
    }
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // Navigating to Page
  const navigate = useNavigate();
  const handleEnter = () => {
    navigate(`${data[current].id}`);
  };
  // Swipeable
  const handlers = useSwipeable({
    onSwipedLeft: ()=> handleNext(),
    onSwipedRight: ()=> handlePrev(),
  })


  
  // Animations
const slideup = useSpring(
  {
       opacity: loaded ? 1 : 0, 
       transform: loaded ? "translateY(0vh)" : "translateY(100vh)",
       delay: 100,
       config: {
         duration: 1200,
         tension: 120,
         friction: 14,
         easing: easings.easeInBounce,
       },
     }
    
   );

  const line1 = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 300,
    delay: 1150,
    config: { duration: 350, tension: 120, friction: 14 },
  });
  const line2 = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 400,
    delay: 1300,

    config: { duration: 350, tension: 120, friction: 14 },
  });
  const line3 = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 400,
    delay: 1450,

    config: { duration: 350, tension: 120, friction: 14 },
  });

  const textSprings = useSprings(
    models.length,
    models.map((el, i) =>
      i === current
        ? {
            from: { opacity: 0 },
            to: { opacity: 1 },
          }
        : {
            from: { opacity: 1 },
            to: { opacity: 0 },
          }
    )
  );
  const indexSprings = useSprings(
    models.length,
    models.map((el, i) =>
      i === current
        ? {
            from: { opacity: 0.1 },
            to: { opacity: 1 },
          }
        : {
            from: { opacity: 1 },
            to: { opacity: 0.1 },
          }
    )
  );

  const scene = {
    models: models,
    current: current,
    loaded: loaded,
    setLoaded: setLoaded,
  };

  let count = -1;
  return (
    <div id="home">
      <a.div className="section-wrap" style={slideup} {...handlers}>
        <div className="info-c">
          {data.map((el, i) => {
            if (el.type === "view") {
              count++;
              return (
                <a.div className="text-c" key={i} style={textSprings[count]}>
                  <a.h6
                    className="title"
                    style={line1}
                    onClick={() => handleEnter()}
                  >
                    {el.title}
                  </a.h6>
                  <a.p className="text" style={line2}>
                    {el.text}
                  </a.p>
                </a.div>
              );
            }
          })}
        </div>
        <a.div className="row" style={line3}>
          <div className="order-btns">
            <div className="order-btn prev" onClick={() => handlePrev()}>
              <p>Prev</p>
            </div>
            <div className="order-btn">
              <p>/</p>
            </div>
            <div className="order-btn next" onClick={() => handleNext()}>
              <p>Next</p>
            </div>
          </div>
          <ul className="index-c">
            {indexSprings.map((el, i) => {
              return (
                <a.div
                  className="index"
                  key={i}
                  style={indexSprings[i]}
                  onClick={() => setCurrent(i)}
                >
                  <div className="index-line" />
                </a.div>
              );
            })}
          </ul>
        </a.div>
      </a.div>
      <Scene {...scene} />
    </div>
  );
}

export default Home;
