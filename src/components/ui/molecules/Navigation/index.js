import React, { useState, useEffect, useRef } from "react";
import { a, useSpring } from "react-spring";
import "./style.css";




function Navigation({current, audio, setAudio}) {
  const [active, toggleActive] = useState(false);

const opacity = useSpring({
  opacity: current > 0 ? 0 : 1
})
// const wrapper = useSpring({
//   height: active ? "100vh" : "0vh"
// })
const background = useSpring({
  // height: active ? "150vh" : "0vh",
  // width: active ? "150vw" : "0vh",
  clipPath: active ? `circle(2200px at 110% -10%)` : "circle(30px at 110vw -10%)"
})

  return (
    <a.div id="navigation">
      <div className="nav-bar">
      <div className="content-box" >
        <a.h2 className="logo" style={opacity}>canis</a.h2>

        {/* <div className="menu" onClick={()=> setAudio(!audio)}> */}
        <div className="menu" onClick={()=> toggleActive(!active)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9H20" stroke="white" strokeWidth={.8}/>
        <path d="M3 15H20" stroke="white" strokeWidth={.8}/>
        </svg>

        </div>
      </div>
      </div>
      <a.div className="nav-back" style={background}/>
    </a.div>
  );
}

export default Navigation;
