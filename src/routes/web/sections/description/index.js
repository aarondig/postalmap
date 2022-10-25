import React, {
  useState, useRef, Suspense
} from "react";
import "./style.css";
import {data} from "../../../../data"

function Description({el, section}) {

  return <div id="description" ref={section}>
    <div className="section-wrap">
    <div className="row">
        <div className="col-3">
          <div className="text-c">
            <h6 className="subtitle">/ {el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
            <p className="text">{el.text}</p>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      </div>
      
  </div>
}

export default Description;

