import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, a } from "@react-spring/three";
import { PerspectiveCamera, PositionalAudio } from "@react-three/drei";
import Loader from "../../molecules/Loader";

import Postcode from "./postcode.js";
import Station from "./station.js";
import Lcc from "./lcc.js";
import Pier from "./pier.js";
import Platform from "./platform.js";

function Cameras({el, ref, camera, isVisible, scroll, remove, startValue}) {

  const camprops = {
    //  ref: ref,
    camera: camera,
    scroll: scroll,
    isVisible: isVisible,
    remove: remove,
    startValue: startValue,
  };

  switch (el.id) {
            default: {
              return null;
            }
            case "postcode": {
             
              return <Postcode {...camprops}/>
            }
            case "station": {
              
              return <Station {...camprops}/>;
            }
            case "platform": {
              
              return <Platform {...camprops}/>;
            }
            case "pier": {
              
              return <Pier {...camprops}/>;
            }
            case "lcc": {
              
              return <Lcc {...camprops}/>;
            }


          }
        



}




export default Cameras;
