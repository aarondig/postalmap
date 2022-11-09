import React, { useState, useRef, Suspense } from "react";
import "./style.css";

function View({ el, section }) {
  return (
    <div id="view" ref={section}>
      <div className="section-wrap">
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
    </div>
  );
}

export default View;
