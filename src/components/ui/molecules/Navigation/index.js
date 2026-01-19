import React, { useState, useEffect, useRef } from "react";
import { a, useSpring } from "react-spring";
import { Slant as Hamburger } from "hamburger-react";

import { IoVolumeOffOutline, IoVolumeMediumOutline } from "react-icons/io5";
import { a as animated, useSprings } from "react-spring";
import "./style.css";
import { data } from "../../../../data";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation({ audioRef, current, setCurrent, audio, setAudio, visibleSelection }) {
  const [active, toggleActive] = useState(false);
  // const [settle, setSettle] = useState(false);
  

const navigate = useNavigate();
const location = useLocation();
const url = location.pathname.split("/");

// Check if we're on the home screen
const isHome = location.pathname === "/postalmap" || location.pathname === "/postalmap/";

const indicator = useSprings(data.length, data.map((el, i)=>
i === current ?
{
  from: {opacity: 0},
  to: {opacity: 1},

} : {
  from: {opacity: 1},
  to: {opacity: 0},

}))

const handleNavigate = (e)=> {
  setCurrent(data[e.target.dataset.key].index)
  navigate(`../${url[1]}/${e.target.dataset.id}`, { replace: true })
  return toggleActive(!active);
}


  const audioOff = useSpring({
    opacity: audio ? 0 : 1,
  });
  const audioOn = useSpring({
    opacity: audio ? 1 : 0,
  });

  // Fade in audio button after leaving home screen
  const audioButtonOpacity = useSpring({
    opacity: isHome ? 0 : 1,
    config: { mass: 1, tension: 280, friction: 60 },
  });

  const opacity = useSpring({
    opacity: visibleSelection <= 0 || active ? 1 : 0,
  });

  const wrapper = useSpring({
    transform: active ? "translateY(0vh)" : "translateY(100vh)",
    background: active ? "#050505" : "#fff",
    config: { mass: 1, tension: 280, friction: 60 },
    // onRest: () => setSettle(true)
  });
  const hamburger = {
    size: 36,
    color: "white",
    distance: "sm",
    duration: 0.4,
  };
  const sound = {
    size: 38,
    color: "white",
  };

  return (
    <div id="navigation">
      <div className="nav-bar">
        <div className="content-box">
          <a.h2 className="logo" style={opacity}>
            canis
          </a.h2>
          <div className="right-side">
            <a.div className="nav-button" ref={audioRef} onClick={() => setAudio(!audio)} style={audioButtonOpacity}>
              <a.div className="nav-icon" style={audioOn}>
                <IoVolumeMediumOutline {...sound} />
              </a.div>
              <a.div className="nav-icon" style={audioOff}>
                <IoVolumeOffOutline {...sound} />
              </a.div>
            </a.div>
          
              <Hamburger
                toggled={active}
                toggle={toggleActive}
                {...hamburger}
              />
       
          </div>
        </div>
      </div>
      <a.div className="nav-active" style={wrapper}>
        <div className="nav-inner-wrap">
        <div className="nav-section">
        <p className="nav-subtitle">
          Project
          </p>
          <div className="nav-link">
            <h6 className="nav-link-title md">Introduction</h6>
          </div>
        </div>
        <div className="nav-section">
        <p className="nav-subtitle">
          Locations
          </p>
          {data.map((el, i)=>{
            return (<div className="nav-link" key={i} onClick={(e)=> handleNavigate(e)}>
            <h6 data-id={el.id} data-key={i} className="nav-link-title lg" >{el.id}</h6>
            {/* <a.div className="indicator" style={indicator[i]}></a.div> */}
          </div>)
          })}
          
        </div>

        {/* <div className="nav-section bottom">
        <p className="nav-subtitle">
          More
          </p>
          <div className="nav-link">
            <h6 className="nav-link-title md">About Us</h6>
          </div>
          <div className="nav-link">
            <h6 className="nav-link-title md">Contact</h6>
          </div>
        </div> */}

        </div>

      </a.div>
      {/* <a.div className="nav-back" style={background}/> */}
    </div>
  );
}

export default Navigation;
