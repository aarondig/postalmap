import React, { useState, useRef, Suspense, useEffect, createRef } from "react";
import "./style.css";
import Description from "../../sections/description";
import {data} from "../../../../data.js";
import View from "../../sections/view";

function Project({pagesize}) {
  

  const [section, setSection] = useState([]);
  const [sectionSize, setSectionSize] = useState([])
  const [projectHeight, setProjectHeight] = useState(0)

  useEffect(() => {
    //Setting Grouped Refs
    setSection((section) =>
      Array(data.length)
        .fill()
        .map((el, i) => section[i] || createRef())
    ); 
  }, []);
  useEffect(()=>{
    if (section.length === data.length) {
      let height = 0
    section.map((el, i)=>{
      let sectsize = el.current.getBoundingClientRect()
      setSectionSize((sectionSize) => [...sectionSize, sectsize]);
      
      height += sectsize.height
      
      setProjectHeight(height)
    })
    }
    
  },[section])
  
  return (
    <div id="project" ref={pagesize}>
        {data.map((el, i) => {
          switch (el.type) {
            default: {
              return <div className="space" key={i} />;
            }
            case "text": {
              return <Description key={i} el={el} section={section[i]}/>;
            }
            case "view": {
              return <View key={i} el={el} section={section[i]}/>;
            }
          }
        })}
   
    </div>
  );
}

export default Project;
