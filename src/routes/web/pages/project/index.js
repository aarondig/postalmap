import React, { useState, useRef, Suspense, useEffect, createRef, useLayoutEffect } from "react";
import "./style.css";
import Description from "../../sections/description";
import { data } from "../../../../data.js";
import View from "../../sections/view";
import Image from "../../sections/image";

function Project({ scrollArea, setProjectHeight, onScroll, scroll }) {
  const [section, setSection] = useState([]);
  const [sectionSize, setSectionSize] = useState([]);

  useEffect(() => {
    //Setting Grouped Refs
    setSection((section) =>
      Array(data.length)
        .fill()
        .map((el, i) => section[i] || createRef())
    );
  }, []);
  useEffect(() => {
    if (section.length === data.length) {
      let height = 0;
      section.map((el, i) => {
        let sectsize = el.current.getBoundingClientRect();
        setSectionSize((sectionSize) => [...sectionSize, sectsize]);

        height += sectsize.height;

        setProjectHeight(height);
      });
    }
  }, [section]);
  const slow3 = useRef([]);

  useEffect(()=>{
    
    slow3.current.map((el, i)=>{
      el.style.transform = `translateY(${-scroll*.3}px)`
   
    })
    
  },[scroll])
  // console.log(slow3)


  const viewP = {
    scroll: scroll,
    scrollArea: scrollArea,


  }
  return (
    <div id="project" ref={scrollArea} onScroll={onScroll}>
     
      {data.map((el, i) => {
        switch (el.type) {
          default: {
            return <div className="space" key={i} />;
          }
          case "text": {
            return (
              <>
                {/* <div className="text-b" /> */}
                <Description key={i} i={i} el={el} section={section[i]} scrollArea={scrollArea} scroll={scroll}/>
              </>
            );
          }
          case "view": {
            return (
              <>
                
                <View key={i} i={i} el={el} section={section[i]} slow3={slow3} {...viewP}/>
                {/* <div className="view-b" /> */}
              </>
            );
          }
          case "image": {
            return (
              <>
          
                {/* <div className="image-b" /> */}
                <Image key={i} el={el} section={section[i]} scrollArea={scrollArea} scroll={scroll}/>
                
              </>
            );
          }
        }
      })}
    </div>
  );
}

export default Project;
