import React, { useState, useEffect, useRef, Suspense } from "react";
import "./style.css";
import {InView} from "react-intersection-observer";


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







  return (

      
      <InView onChange={setInView} id="slider" threshold={.6} style={lightMode ? {background: "#f4f4f4"} : {background: "#050505"}} >
    <div className="content-wrap">
      
    <h6 className="subtitle">{el.subtitle}</h6>
    </div>


        <div className="slider">
        
      
      <ul className="card-row">
      {el.images.map((el, i)=> {
        return <li className="card" key={i}>
          <div className="thumbnail">
            {/* <img src={el.src}/> */}
          </div>
          <div className="text-c" style={lightMode ? {color: "#050505"} : {color: "#fff"}}>
            <h6 className="subtitle" style={lightMode ? {color: "#707070"} : {color: "#959595"}}>{el.subtitle}</h6>
            <h4 className="title">{el.title}</h4>
          </div>
        </li>
      })}
      </ul>
      </div>
      
      
      </InView>

  );
}

export default Slider;
