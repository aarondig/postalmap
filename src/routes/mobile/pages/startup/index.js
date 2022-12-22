import React, { useState, useRef, Suspense, useEffect, createRef } from "react";
import "./style.css";
import { useProgress } from "@react-three/drei";
import {
  a,
  useSpring,
  useSprings,
  useSpringRef,
  useTransition,
} from "react-spring";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function Cover({ startIntro, setStartIntro }) {
  const [fadeOut, setFadeOut] = useState(false);
  //Animated Letters
  const wordCount = ["welcome", "to", "canis"];

  const cover = useSprings(
    wordCount.length,
    wordCount.map((el, i) =>
      !fadeOut
        ? {
            from: {
              opacity: 0,
              transform: "translateY(+10px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0)",
            },

            delay: 800 + 220 * i,
            config: {
              // mass: 1,
              // tension: 280,
              // friction: 18
            },
            onRest: () => {
              setFadeOut(true);
            },
          }
        : {
            from: {
              opacity: 1,
              transform: "translateY(0px)",
            },
            to: {
              opacity: 0,
              transform: "translateY(-40px)",
            },

            delay: 400 + 400 * i,
            config: {
              // mass: 1,
              // tension: 280,
              // friction: 18
            },
            onRest: (e) => {
              if (i === wordCount.length - 1) {
                if (e.value.opacity === 0) {
                  setStartIntro(true);
                }
              }
            },
          }
    )
  );

  return (
    <div id="cover">
      <div className="cover-title">
        <a.h6 className="cover-word" style={cover[0]}>
          welcome
        </a.h6>
        <a.h6 className="cover-word" style={cover[1]}>
          to
        </a.h6>
        <a.h6 className="cover-word" style={cover[2]}>
          canis
        </a.h6>
      </div>
    </div>
  );
}

function Startup({ loading, setLoading, handleStart }) {
  const { ref, inView, entry } = useInView();

  const [startIntro, setStartIntro] = useState(false);

  const [counter, setCounter] = useState(0);
  const [countDone, setCountDone] = useState(false);
  const [unmount, setUnmount] = useState(false);
  const [array, setArray] = useState([]);

  //Unmount
  const fadeOut = useSpring(
    unmount && {
      from: { opacity: 1, pointerEvents: "all" },
      to: { opacity: 0, pointerEvents: "none" },
      config: { duration: 400 },
      onRest: () => setLoading(false),
    }
  );
  const navigate = useNavigate()
  const handleUnmount = () => {
    navigate("home");
    if (countDone) {
      setUnmount(true);
    }
  };

  //  const { active, progress, errors, item, loaded, total } = useProgress();

  //Counter
  useEffect(() => {
    if (!countDone) {
      if (Number.isInteger(counter / 5)) {
        setArray((array) => [...array, counter]);
      }

      // setTimeout(() => setCounter(counter + 1), 30);
      setTimeout(() => setCounter(counter + 0.2), 30);
    }
    if (counter >= 99.8) {
      //Prevents gap in svg circle on completion
      setArray((array) => [...array, 100]);
      setCountDone(true);
    }
  }, [counter]);

  let radius = 30;
  let stroke = 1;
  let amount = counter;
  let normalizedRadius = radius - stroke * 2;
  let circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (amount / 100) * circumference;

  //  ANIMATIONS

  //Animated Ring

  const [fade, setFade] = useState([1, 2, 3, 4]);

  //ANIMATIONS
  const line1 = useSpring({
    opacity: startIntro ? 1 : 0,
    transform: startIntro ? "translateY(0)" : "translateY(20px)",
    delay: 300,
    config: { duration: 250 },
  });
  const line2 = useSpring({
    opacity: startIntro ? 1 : 0,
    transform: startIntro ? "translateY(0)" : "translateY(20px)",
    delay: 400,
    config: { duration: 250 },
  });
  const line3 = useSpring({
    opacity: startIntro ? 1 : 0,
    transform: startIntro ? "translateY(0)" : "translateY(20px)",
    delay: 300,
    config: { duration: 250 },
  });

  const fadeIn = useSprings(
    fade.length,
    fade.map((el, i) =>
      !unmount
        ? startIntro && {
            from: {
              opacity: 0,
              transform: `translateY(+20px) scale(${i === 0 ? 2 : 0.8})`,
            },
            to: {
              opacity: 1,
              transform: `translateY(0) scale(${i === 0 ? 3 : 1})`,
            },

            delay: 220 * i,
            config: { mass: 1, tension: 120, friction: 40 },
          }
        : {
            from: {
              transform: `translateY(0) scale(${
                i === 0 ? 4 : i === 1 ? 1.2 : 1
              })`,
              opacity: 1,
            },
            to: {
              transform: `translateY(0) scale(${
                i === 0 ? 30 : i === 1 ? 1.8 : 1
              })`,
              opacity: 0,
            },

            delay: i === 1 ? 220 * i : 260,
            config: { mass: 3, tension: 280, friction: 60 },
          }
    )
  );

  //Animated Letters
  // const letters = ["S", "E", "1", "0", "-", "9", "D", "D"];
  // const lettersRef = useSpringRef();

  // const lettersSprings = useSprings(
  //   letters.length,
  //   letters.map(
  //     (el, i) =>
  //       countDone && {
  //         from: {
  //           opacity: 0,
  //           transform: "translateY(+20px)",
  //         },
  //         to: {
  //           opacity: 1,
  //           transform: "translateY(0)",
  //         },

  //         delay: 900 + 180 * i,
  //         config: {
  //           // mass: 1,
  //           // tension: 280,
  //           // friction: 18
  //         },
  //         lettersRef,
  //         onRest: () => {
  //           // if (i=== letters.length-1 ) {
  //           //   setLoading(false);
  //           // }
  //         },
  //       }
  //   )
  // );

  // const counterExit = useSpring({
  //   opacity: countDone ? 0 : 1,
  //   delay: 100,
  // });

  const [flip, set] = useState(false);
  const bounce = useSpring({
    reverse: flip,
    from: { opacity: 0 },
    to: { opacity: 0.8 },
    config: { duration: 800 },
    onRest: () => set(!flip),
  });
  const opacity = useSpring({
    opacity: countDone ? 1 : 0,
    config: { duration: 1200 },
  });

  let mode = false;

  return (
    <a.div id="startup" ref={ref} style={fadeOut} onClick={() => handleUnmount()}>
      {/* {!startIntro ? (
        <Cover startIntro={startIntro} setStartIntro={setStartIntro} />
      ) : ( */}
        <div id="startup-wrap">
          <div className="row">
            <div className="col-2">
              {/* <a.div className="letters-c" style={fadeIn[1]}>
                {lettersSprings.map((el, i) => {
                  return (
                    <a.h1 className="letter" key={i} style={lettersSprings[i]}>
                      {letters[i]}
                    </a.h1>
                  );
                })}
              </a.div> */}
            </div>

            <div className="col-3">
              <div className="section-wrap">
                <div
                  className="content-c"
                >
                  <a.h6 className="subtitle" style={line1}>
                    / Introduction
                  </a.h6>
                  <a.p className="text" style={line2}>
                    Our group, Canis, was tasked with creating a map from a
                    postal code in London back to our University.
                  </a.p>
                  <div className="line"/>
                  <a.div className="loading-btn" style={fadeIn[2]}>
                    {!countDone ? (
                      <a.p className="loading-text" style={bounce}>
                        Loading...
                      </a.p>
                    ) : (
                      <a.p className="loading-text" style={opacity}>
                        Skip Intro
                      </a.p>
                    )}
                    <a.div className="loading-svg-c" style={{opacity: 1}}>
                      <svg
                        className="svg-path"
                        height={radius * 2}
                        width={radius * 2}
                      >
                        <circle
                          stroke={mode === "light" ? "#404040" : "#f4f4f4"}
                          fill={"transparent"}
                          strokeWidth={stroke}
                          strokeDasharray={circumference + " " + circumference}
                          style={{ strokeDashoffset }}
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                      </svg>
                      <svg
                        className="svg-arrow"
                        height={radius / 1.5}
                        width={radius / 2.5}
                      >
                        <a.path
                          d="M1 1L10 10L1 19"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={opacity}
                          fill="transparent"
                        />
                      </svg>
                      <svg
                        className="svg-back"
                        height={radius * 2}
                        width={radius * 2}
                      >
                        <circle
                          stroke={mode === "light" ? "#f4f4f4" : "#202020"}
                          fill="transparent"
                          strokeWidth={stroke}
                          style={{ strokeDashoffset }}
                          r={normalizedRadius}
                          cx={radius}
                          cy={radius}
                        />
                      </svg>
                    </a.div>
                  </a.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </a.div>
  );
}

export default Startup;
{
  /* <div className="svg-c-background" style={{background: "#f4f4f4"}}/>
                  <a.div className="svg-c-background" style={fill}></a.div> */
}
