import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import { a, useSpring } from "react-spring";
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

  // useEffect(()=>{

  //     //If scroll is positive
  //     if (scroll.slice(-1) > scroll.slice(-2)) {
  // if (inView) {

  //     setOpa((opa + 1) * 1.2)
  //     content.VisibleSection.style.opacity = opa / 250
  // }
  //     }
  //     if (scroll.slice(-1) < scroll.slice(-2)) {

  //       setOpa(opa <= .04 ? 0 : ((opa + 1) / 1.2))
  //       content.VisibleSection.style.opacity = opa / 250

  //       }

  //       console.log(opa/250)
  //     //If scroll is negative

  //     // console.log(scroll.slice(-1) > scroll.slice(-2))

  // },[scroll])

  // ref={(element) => (slow3.VisibleSection[i] = element)}

  // PARALLAX
  //   const [scrollStart, setScrollStart] = useState(false)
  //   useEffect(()=>{
  //     if (inView) {
  //       !scrollStart && setScrollStart(scroll);
  //       parallax.VisibleSection.style.transform = `translateY(${((scroll-scrollStart)*.3)}px)`
  //     }
  //   if (!inView) {
  //     scrollStart && setScrollStart(false);
  //   }
  // // console.log(scroll + scrollStart)
  //   },[scroll])

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
                ref={parallax}
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
      {/* {data[i+1] && data[i+1].type !== "video" || "slider" && <div className="bottom-spacer" />} */}
    </InView>
    </InView>
  );
}

export default Text;
