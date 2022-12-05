import React, { useState, useEffect, useRef, Suspense } from "react";
import "./style.css";
import {InView} from "react-intersection-observer";
import {a, useSpring, useSprings} from "react-spring";
import {data} from "../../../../data"

function Slider({ i, el, section, setCurrent, slowFixed, scroll}) {


// SETS IN VIEW

const [inView, setInView] = useState();
useEffect(()=>{
  inView && setCurrent(i)

},[inView])

// LIGHT MODE OR DARK MODE (False is Dark)
const [lightMode, setLightMode] = useState();

useEffect(()=>{
  if (el.lightMode === "light"){
    setLightMode(true)
  }
  if (el.lightMode === "dark") {
    setLightMode(false)
  }
  },[])
  
// ANIMATIONS
const fadeIn = useSprings(
  el.images.length,
  el.images.map((el, i) =>
     inView ? {
          from: {
            opacity: 0,
            transform: `translateY(+20px)`,
          },
          to: {
            opacity: 1,
            transform: `translateY(0px)`,
          },

          delay: 220 * i,
          config: { mass: 1, tension: 120, friction: 40 },
        } :
        {
          from: {
            opacity: 1,
            transform: `translateY(0px)`,
          },
          to: {
            opacity: 0,
            transform: `translateY(-20px)`,
          },

          delay: 220 * i,
          config: { mass: 1, tension: 120, friction: 40 },
        }
      
  )
);

const subtitle = useSpring({
  opacity: inView ? 1 : 0,
  
  // delay: 300,
  config: { duration: 250 },
});


const slider = {
  id: "slider",
  ref: section,
  onChange: setInView,
  threshold: .6,


}

  return (
      <InView style={lightMode ? {background: "#f4f4f4"} : {background: "#050505"}} {...slider}>
    <div className="content-wrap">
      
    <a.h6 className="subtitle" style={subtitle}>{el.subtitle}</a.h6>
    </div>


        <div className="slider">
        
      
      <ul className="card-row">
      {el.images.map((el, i)=> {
        return <a.li className="card" key={i} style={fadeIn[i]}>
          <div className="thumbnail">
            <img src={el.src}/>
          </div>
          <div className="text-c" style={lightMode ? {color: "#050505"} : {color: "#fff"}}>
            <h6 className="subtitle" style={lightMode ? {color: "#707070"} : {color: "#959595"}}>{el.subtitle}</h6>
            <h4 className="title">{el.title}</h4>
          </div>
        </a.li>
      })}
      </ul>
      </div>
      {data[i+1] !== undefined && (data[i+1].type !== "slider" && <div className="bottom-spacer" />)}
      
      </InView>

  );
}

export default Slider;
