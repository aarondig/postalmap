import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import { a, useSpring, useSprings } from "react-spring";
import useOnScreen from "../../../../hooks/useOnScreen";
import { InView } from "react-intersection-observer";

function Text({
  i,
  el,
  section,
  setVisibleSection,
  slow3,
  scrollContainer,
  scroll,
  data
}) {

  const [inView, setInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    inView && setVisibleSection(i);
  }, [inView]);

  const parallax = useRef();



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

  const textSprings = useSprings(
    el.text.length,
    el.text.map(
      (el, i) =>
      inView ? {
          from: {
            opacity: 0,
            transform: "translateY(+20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },

          delay: (100 * i)+ 300,
          config: {
            // mass: 1,
            // tension: 280,
            // friction: 18
          },
        } :
        {
          from: {
            opacity: 1,
            transform: "translateY(0px)",
          },
          to: {
            opacity: 0,
            transform: "translateY(+20px)",
          },

          delay: (100 * i)+ 300,
          config: {
            // mass: 1,
            // tension: 280,
            // friction: 18
          },
        }
    )
  );


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

  const text = {
    id: "text",
    ref: section,

    style: lightMode ? { background: "#f4f4f4", } : { background: "#050505", },

    onChange: (entry) => !entry && setInView(false),
  };

  return (
    <InView {...text}>
    <InView onChange={(entry) => entry && setInView(true)} threshold={.6}>
      
      {/* {data[i-1] && (data[i-1].type !== "detail" && <div className="top-spacer" />)} */}
      <div className="section-wrap">
        <div className="row">
          <div className="col-3">
            {lightMode ? (
              <div
                className="text-c"
                ref={parallax}
                style={lightMode ? { color: "#050505" } : { color: "#ffffff" }}
              >
                {el.subtitle !== null && <h6 className="subtitle">{el.subtitle}</h6>}
                {el.title !== null &&  <h2 className="title">{el.title}</h2>}
                {el.text.map((e,i)=>{
                  return (<p className="text" key={i}>{el.text[i]}</p>)
                })
                }
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
                ref={parallax}
                style={lightMode ? { color: "#050505" } : { color: "#ffffff" }}
              >
                {el.subtitle !== null && <a.h6 className="subtitle" style={line1}>
                  {el.subtitle}
                </a.h6>}
                {el.title !== null &&  <a.h2 className="title" style={line2}>
                  {el.title}
                </a.h2>}
                {el.text !== null && el.text.map((e,i)=>{
                return <a.p className="text" style={textSprings[i]} key={i}>
                  {el.text[i]}
                </a.p>
                })}
                
              </div>
            )}
          </div>
          {/* <div className="col-1"></div> */}
        </div>
      </div>
      {/* {data[i+1] && data[i+1].type !== "video" || "slider" && <div className="bottom-spacer" />} */}
    </InView>
    </InView>
  );
}

export default Text;
