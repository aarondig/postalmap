import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import { data } from "../../../../data";
import { a, useSpring } from "react-spring";
import useOnScreen from "../../../../hooks/useOnScreen";
import { InView } from "react-intersection-observer";

function Title({
  i,
  el,
  section,
  setCurrent,
  slow3,
  scrollContainer,
  scroll,
}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    inView && setCurrent(i);
  }, [inView]);


  //ANIMATIONS
  const line1 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    delay: 100,
    config: { duration: 250 },
  });
  const line2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    delay: 200,
    config: { duration: 250 },
  });
  const line3 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    delay: 300,
    config: { duration: 250 },
  });

  // LIGHT MODE OR DARK MODE (False is Dark)
  const [lightMode, setLightMode] = useState();

  useEffect(() => {
    if (el.lightMode === "light") {
      setLightMode(true);
    }
    if (el.lightMode === "dark") {
      setLightMode(false);
    }
  }, []);

  const title = {
    id: "title",
    ref: section,

    style: lightMode ? { background: "#f4f4f4", paddingBottom: 0, } : { background: "#050505", paddingBottom: "60px", },

    onChange: setInView,
    threshold: 0.6,
  };

  return (
    <InView {...title}>
      <div className="section-wrap">
        <div className="line"/>
        <div className="row">
          <div className="col-3">
            {lightMode ? (
              <div
                className="text-c"
                
                style={lightMode ? { color: "#050505" } : { color: "#ffffff" }}
              >
                <h6 className="subtitle">{el.subtitle}</h6>
                <h2 className="title">{el.title}</h2>
                <p className="text">{el.text}</p>
                {el.button && (
                  <div className="button-c">
                    <a href={el.button.link}>
                      <h6 className="button-text">{el.button.text}</h6>
                     </a> 
                      

                      <div className="button-visual"></div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="text-c"
            
                style={lightMode ? { color: "#050505" } : { color: "#ffffff" }}
              >
                <a.h6 className="subtitle" style={line1}>
                  {el.subtitle}
                </a.h6>
                <a.h2 className="title" style={line2}>
                  {el.title}
                </a.h2>
                <a.p className="text" style={line3}>
                  {el.text}
                </a.p>
              </div>
            )}
          </div>
          {/* <div className="col-1"></div> */}
        </div>
      </div>
    </InView>
  );
}

export default Title;
