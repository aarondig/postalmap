import React, { useState, useEffect, useRef, Suspense } from "react";
import "./style.css";
import {InView} from "react-intersection-observer";

function View({ i, el, section, setCurrent, slowFixed, scroll}) {
const [inView, setInView] = useState();
const parallax = useRef();

const [count, setCount] = useState(0);

useEffect(()=>{
  inView && setCurrent(i)
  setCount(scroll)
},[inView])





  return (

      
      <InView onChange={setInView} threshold={.6} id="view" >
        {/* <InView onChange={setInView} id="view" style={{transform: "translateZ(-1800px) scale(3.25)", width: "100%", height: "100%"}} > */}
      {/* <div className="section-wrap" ref={(element) => (slowFixed.current[i] = element)}> */}
      <div className="section-wrap" ref={parallax}>
      {/* <div className="content-box"> */}
      <div className="row"> 
        <div className="col-2">
          <div className="text-c">
            <h6 className="subtitle">{el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      
      </div>
      </InView>

  );
}

export default View;
