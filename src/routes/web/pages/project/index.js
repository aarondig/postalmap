import React, { useState, useRef, Suspense, useEffect, createRef, useLayoutEffect } from "react";
import "./style.css";
import Description from "../../sections/description";
import { data } from "../../../../data.js";
import View from "../../sections/view";
import Image from "../../sections/image";
import Detail from "../../sections/detail";

function Project({ scrollArea, onScroll, scroll }) {

  const [current, setCurrent] = useState(0)

useEffect(()=>{
},[current])

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
  // console.log(slow3)


  const viewP = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slowFixed: slowFixed,

  }

  const textP = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slow3: slow3,


  }
  const detailP = {
    scroll: scroll,
    scrollArea: scrollArea,

    setCurrent: setCurrent,
    slow3: slow3,


  }

  const imageP = {
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
                {/* <div className="text-b" /> */}
                <Description key={i} i={i} el={el} section={section[i]} {...textP}/>
              </>
            );
          }
          case "view": {
            return (
              <>
                
                <View key={i} i={i} el={el} section={section[i]} {...viewP}/>
                {/* <div className="view-b" /> */}
              </>
            );
          }
          case "image": {
            return (
              <>
          
                <Image key={i} i={i} el={el} section={section[i]} {...imageP}/>
                
              </>
            );
          }
          case "detail": {
            return (
              <>
          
                <Detail key={i} i={i} el={el} section={section[i]} {...detailP}/>
                
              </>
            );
          }
        }
      })}
    </div>
  );
}

export default Project;
