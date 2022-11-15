import React, { useState, useRef, Suspense, useEffect, createRef, useLayoutEffect } from "react";
import "./style.css";
import Description from "../../sections/description";
import { data } from "../../../../data.js";
import View from "../../sections/view";
import Image from "../../sections/image";
import Detail from "../../sections/detail";
import Module from "../../../../components/ui/organisms/module";

function Project({ scroll, onScroll, scrollArea, setCurrent  }) {

  // const [current, setCurrent] = useState(0)

  const [section, setSection] = useState([]);
  const [sectionSize, setSectionSize] = useState([]);

    //       useEffect(() => {
    // //Setting Grouped Refs
    //           setSection((section) =>
    //             Array(data.length)
    //               .fill()
    //               .map((el, i) => section[i] || createRef())
    //           );
    //         }, []);
    //         useEffect(() => {
    //           if (section.length === data.length) {
    //             let height = 0;
    //             section.map((el, i) => {
    //               let sectsize = el.current.getBoundingClientRect();
    //               setSectionSize((sectionSize) => [...sectionSize, sectsize]);

    //               height += sectsize.height;

    //               setProjectHeight(height);
    //             });
    //           }
    //         }, [section]);



  //Parallax Items
  const slowFixed = useRef([]);
  const slow3 = useRef([]);


  useEffect(()=>{
    
    slowFixed.current.map((el, i)=>{
      el.style.transform = `translateY(${-scroll*.3}px)`
    })
    slow3.current.map((el, i)=>{
      el.style.transform = `translateY(${scroll*.01}px)`
    })
    
  },[scroll])
 


  const view = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slowFixed: slowFixed,

  }

  const text = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slow3: slow3,


  }
  const detail = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slow3: slow3,


  }

  const image = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slowFixed: slowFixed,

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
                <Description key={i} i={i} el={el} section={section[i]} {...text}/>
              </>
            );
          }
          case "view": {
            return (
        
                <View key={i} i={i} el={el} section={section[i]} {...view}/>
          
            );
          }
          case "image": {
            return (
              <>
          
                <Image key={i} i={i} el={el} section={section[i]} {...image}/>
                
              </>
            );
          }
          case "detail": {
            return (
              <>
                <Detail key={i} i={i} el={el} section={section[i]} {...detail}/>
              </>
            );
          }
        }
      })}

      
    </div>
  );
}

export default Project;
