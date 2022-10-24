import React, { useState, useRef, Suspense } from "react";
import "./style.css";
import Description from "../../sections/description";
import {data} from "../../../../data.js";
import View from "../../sections/view";

function Project({pagesize}) {
  return (
    <div id="project" ref={pagesize}>
        {data.map((el, i) => {
          switch (el.type) {
            default: {
              return <div className="space" key={i} />;
            }
            case "text": {
              return <Description key={i} el={el} />;
            }
            case "view": {
              return <View key={i} el={el}/>;
            }
          }
        })}
   
    </div>
  );
}

export default Project;
