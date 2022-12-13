import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import "./style.css";
import {InView, useInView} from "react-intersection-observer";
import {data} from "../../../../data"
import { serialize } from "cheerio/lib/api/forms";


function View({ i, el, section, setCurrent, sectionSize, scroll}) {

const handleVisible = (inView, entry) => { 

  if (inView) {
    // setIsInView(inView)
    setCurrent(i)
  }
}


  return (

    <InView id="view" ref={section}>
      <InView className="inView" onChange={(inView, entry) => handleVisible(inView, entry)} threshold={.6}>
        
      <div className="section-wrap" >
      {/* <div className="content-box"> */}
      <div className="row"> 
        <div className="col-2">
          <div className="text-c">
            <h6 className="subtitle">/ {el.number} {el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      
      </div>
      
      </InView>
      </InView>

  );
}

export default View;
