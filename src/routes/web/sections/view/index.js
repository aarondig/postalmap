import React, { useState, useEffect, Suspense } from "react";
import "./style.css";
import {InView} from "react-intersection-observer";

function View({ i, el, section, setCurrent, slowFixed}) {
const [inView, setInView] = useState();

useEffect(()=>{
  setCurrent(i)
},[inView])

  return (
    <div id="view" ref={section}>
      <InView onChange={setInView}>
      <div className="section-wrap" ref={(element) => (slowFixed.current[i] = element)}>
      {/* <div className="content-box"> */}
      <div className="row">
        <div className="col-2">
          <div className="text-c">
            <h6 className="subtitle">/ {el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      
      </div>
      </InView>
    </div>
  );
}

export default View;
