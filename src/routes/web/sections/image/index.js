import React, {
  useState, useRef, Suspense
} from "react";
import "./style.css";
import {data} from "../../../../data"

function Image({el, section}) {

  return <div id="image" ref={section}>
    <div className="section-wrap">
 
       
          <div className="image-c">
            <img className="image" src={el.src}/>
     
   
      </div>
      </div>
      
  </div>
}

export default Image;

