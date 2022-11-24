import React, { useState, useEffect, useRef } from "react";
import { a, useSpring } from "react-spring";
import { Slant as Hamburger } from "hamburger-react";
import { IoVolumeOffOutline, IoVolumeMediumOutline } from "react-icons/io5";
import "./style.css";

function Navigation({ current, audio, setAudio }) {
  const [active, toggleActive] = useState(false);
  // const [settle, setSettle] = useState(false);

  // useEffect(() => {
  //   setAudio(active);
  // }, [active]);

  const audioOff = useSpring({
    opacity: audio ? 0 : 1,
  });
  const audioOn = useSpring({
    opacity: audio ? 1 : 0,
  });

  const opacity = useSpring({
    opacity: current <= 0 || active ? 1 : 0,
  });

  const wrapper = useSpring({
    height: active ? "100vh" : "0vh",
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
            <a.div className="nav-button"  onClick={() => setAudio(!audio)}>
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


      </a.div>
      {/* <a.div className="nav-back" style={background}/> */}
    </div>
  );
}

export default Navigation;
