import React, { useState, useEffect } from "react";
import { a, useSpring } from "react-spring";
import "./style.css";

function Navigation({current, audio, setAudio}) {
const opacity = useSpring({
  opacity: current > 0 ? 0 : 1
})
  return (
    <div id="navigation">
      <div className="content-box" >
        <a.h2 className="logo" style={opacity}>canis</a.h2>

        <div className="menu" onClick={()=> setAudio(!audio)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 9H22" stroke="white" strokeWidth={.8}/>
<path d="M3 15H22" stroke="white" strokeWidth={.8}/>
</svg>

        </div>
      </div>
    </div>
  );
}

export default Navigation;
