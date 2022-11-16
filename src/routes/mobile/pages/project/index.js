import React, { useState, useRef, Suspense, useEffect, createRef, useLayoutEffect } from "react";
import "./style.css";
import Description from "../../sections/description";
import { data } from "../../../../data.js";
import View from "../../sections/view";
import Image from "../../sections/image";
import Detail from "../../sections/detail";
import Module from "../../../../components/ui/organisms/module";
import Slider from "../../sections/slider";

function Project({ scroll, onScroll, scrollContainer, scrollContent, setCurrent  }) {
  const [section, setSection] = useState([]);


  //Parallax Items
  const slowFixed = useRef([]);
  const slow3 = useRef([]);


  // useEffect(()=>{
    
  //   slowFixed.current.map((el, i)=>{
  //     el.style.transform = `translateY(${-scroll*.3}px)`
  //   })
  //   slow3.current.map((el, i)=>{
  //     el.style.transform = `translateY(${scroll*.01}px)`
  //   })
    
  // },[scroll])
 
//START UP

  useEffect(()=>{
// Setting Index for Each
  data.map((el, i)=>{
    el.index = i;
  })

  },[])


  const view = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
    slowFixed: slowFixed,

  }

  const text = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
    slow3: slow3,


  }
  const detail = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
    slow3: slow3,


  }

  const image = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
    slowFixed: slowFixed,

  }


  return (
    <div id="project" ref={scrollContainer} onScroll={onScroll}>
      {data.map((el, i) => {
        switch (el.type) {
          default: {
            return <div className="space" key={i} />;
          }
          case "text": {
            return (
              
                <Description key={i} i={i} el={el} section={section[i]} {...text}/>
              
            );
          }
          case "view": {
            return (
        
                <View key={i} i={i} el={el} section={section[i]} {...view}/>
          
            );
          }
          case "image": {
            return (
            
          
                <Image key={i} i={i} el={el} section={section[i]} {...image}/>
                
       
            );
          }
          case "detail": {
            return (
    
                <Detail key={i} i={i} el={el} section={section[i]} {...detail}/>
             
            );
          }
          case "slider": {
            return (
           
                <Slider key={i} i={i} el={el} section={section[i]} {...detail}/>
           
            );
          }
        }
      })}


    </div>
  );
}

export default Project;
