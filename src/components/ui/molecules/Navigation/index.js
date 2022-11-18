import React, { useState, useEffect, useRef } from "react";
import { a, useSpring } from "react-spring";
import "./style.css";




function Navigation({current, audio, setAudio}) {
  const [active, toggleActive] = useState(false);
  // const [settle, setSettle] = useState(false);

const opacity = useSpring({
  opacity: current <= 0 || active ? 1 : 0
})
// HAMBURGER ANIMATIONs
const path1 = useSpring({
  transform: active ? "translateX(9px) translateY(-4px) rotate(45deg)" : " translateX(0px) translateY(0px) rotate(0)"
})
const path2 = useSpring({
  transform: active ? "translateX(-8px) translateY(8px) rotate(-45deg)" : "translateX(0px) translateY(0px) rotate(0)"
})

const wrapper = useSpring({
  height: active ? "100vh" : "0vh",
  background: active ? "#050505" : "#404040",
  config: { mass: 1, tension: 280, friction: 60 },
  // onRest: () => setSettle(true)
  
})


  return (
    <div id="navigation">
      <div className="nav-bar">
      <div className="content-box" >
        <a.h2 className="logo" style={opacity}>canis</a.h2>

        {/* <div className="menu" onClick={()=> setAudio(!audio)}> */}
        <div className="menu" onClick={() => toggleActive(!active)}>

        {/* <Hamburger toggled={isOpen} toggle={setOpen} /> */}
        {/* <a.svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <a.path style={path1} d="M3 9H20" stroke="white" strokeWidth={.8}/>
        <a.path style={path2} d="M3 15H20" stroke="white" strokeWidth={.8}/>
        </a.svg> */}
      

        </div>
      </div>
      </div>

      <a.div className="nav-active" style={wrapper}>


      </a.div>
      {/* <a.div className="nav-back" style={background}/> */}
    </div>
  
  );
}

export default Navigation;
