import React, { useState, useRef, Suspense, useEffect, createRef } from "react";
import "./style.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

// import {
//   a,
//   useSpring,
//   useSprings,
//   useSpringRef,
//   useTransition,
// } from "react-spring";
import { a, easings } from "react-spring";
import { useSpring, useSprings, useSpringRef, useChain, a as Animated } from "@react-spring/three";
import { data } from "../../../../data";
import { OrbitControls, Plane, Float } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function Model({ model, el, i, current }) {
  const group = useRef();
const [remove, setRemove] = useState(false);


  const { nodes, materials } = useLoader(GLTFLoader, el.object);

  const { opacity } = useSpring({
    opacity: current === i ? 1 : 0,
    onRest: () => current !== i && setRemove(true),
  });
  if (materials.main !== undefined) {
    materials.main.map = null;
    // materials.main.color = new THREE.Color(0xdadada);
    // materials.main.color = new THREE.Color(0xeeeeee);
    materials.main.color = new THREE.Color(0x404040);
    materials.main.transparent = true;
    materials.main.opacity = opacity;
  }
  if (materials[""] !== undefined) {
    materials[""].map = null;
    materials[""].color = new THREE.Color(0x404040);
    materials[""].transparent = true;
    materials[""].opacity = opacity;
  }

  // useEffect(()=> {

  // },[current])
  if (group.current) {
    group.current.visible = i === current ? true : (remove && false);
  }

  return (
    <group ref={group}>
      <Float
  speed={.8} // Animation speed, defaults to 1
  rotationIntensity={.8} // XYZ rotation intensity, defaults to 1
  floatIntensity={.4} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
  floatingRange={[0, 1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
>
      <mesh
        ref={model}
        // material={materials.main}
        geometry={
          nodes.mesh !== undefined ? nodes.mesh.geometry : nodes.mesh_0.geometry
        }

        // Maybe remove
        // position={
        //   nodes.mesh !== undefined ? [0,0,0] : [0,1,0]
        // }
        // position={[0, -1, -40]}
        scale={0.2}
      >
        <Animated.meshStandardMaterial
          {...(materials.main !== undefined ? materials.main : materials[""])}
        />
      </mesh>
      </Float>
    </group>
  );
}

function Scene({ models, current }) {
  const model = {
    current: current,
  };

  let count = 0;

  return (
    <div id="canvas" className="home">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 70 }}
        gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}
      >
        {/* <fog attach="fog" args={["white", 0, 15]} /> */}
        <fog attach="fog" args={["black", 0,20]} />
        <pointLight position={[0, 5, 4]} intensity={0.2} 
   />
        {/* <pointLight position={[0, -30, -10]} intensity={0.1}/> */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 1, 0]} intensity={0.8}/>
        {data.map((el, i) => {
          if (el.type === "view") {
            return (
              <Model el={el} i={count++} key={i} model={models[i]} {...model} />
            );
          }
        })}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function Home({current, setCurrent, basename}) {
//Startup Function
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
  const navigate = useNavigate()
  const handleEnter = () => {
   navigate(`${data[current].id}`);
  };



  // Animations
  const slideup = useSpring({
    from: { opacity: 0, transform: "translateY(100vh)" },
    to: { opacity: 1, transform: "translateY(0vh)" },
    delay: 100,
    config: { duration: 1200,
       tension: 120, friction: 14 ,
      easing: easings.easeInBounce
  },

  });
  const line1 = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 300,
    delay: 1150,
    config: { duration: 350, 
      tension: 120, friction: 14 ,
  
  },


  });

  const line2 = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 400,
    delay: 1300,

    config: { duration: 350,
      tension: 120, friction: 14 ,
  
  },

  
  });
  const line3 = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 400,
    delay: 1450,

    config: { duration: 350,
      tension: 120, friction: 14 ,
  
  },

  
  });


  const textSprings = useSprings(
    models.length, 
    models.map(
    (el, i) =>
      i === current ? {
    from: { opacity: 0 },
    to: { opacity: 1 },

    
  } : {
    from: { opacity: 1 },
    to: { opacity: 0 },

  })
)
const indexSprings = useSprings(
  models.length, 
  models.map(
  (el, i) =>
    i === current ? {
  from: { opacity: .1 },
  to: { opacity: 1 },

  
} : {
  from: { opacity: 1 },
  to: { opacity: .1 },

})
)

  const scene = {
    models: models,
    current: current,
  };

  let count = -1;
  return (
    <div id="home">
      <a.div className="section-wrap" style={slideup}>
        
          <div className="info-c">
        {data.map((el, i) => {
              if (el.type === "view") {
                count++;
              return (<a.div className="text-c" key={i} style={textSprings[count]}>
                <a.h6 className="title" style={line1} onClick={() => handleEnter()}>
                {el.title}
                </a.h6>
                <a.p className="text" style={line2}>
                  {el.text}
                </a.p>
                </a.div>)
              }
            })}
          </div>
        <a.div className="row" style={line3}> 
        <div className="order-btns">
        <div className="order-btn prev" onClick={() => handlePrev()}>
          <p >Prev</p>
          </div>
          <div className="order-btn">
          <p >/</p>
          </div>
          <div className="order-btn next" onClick={() => handleNext()}>
          <p >Next</p>
          </div>
        </div>
          <ul className="index-c" >
            {indexSprings.map((el, i) => {
          
                return (<a.div className="index" key={i} style={indexSprings[i]} onClick={() => setCurrent(i)}><div className="index-line"/></a.div>)
               
             
            })}
          </ul>
          </a.div>
      </a.div>
      <Scene {...scene} />
    </div>
  );
}

export default Home;
