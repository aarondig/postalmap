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

function Loader({ loading, setLoading, handleStart }) {
  const [counter, setCounter] = useState(0);
  const [countDone, setCountDone] = useState(false);
  const [unmount, setUnmount] = useState(false);
  const [array, setArray] = useState([]);
  
  //Unmount

  const fadeOut = useSpring(unmount && {
  

    from: { opacity: 1, pointerEvents: "all" },
    to: { opacity: 0, pointerEvents: "none" },
    config: {duration: 400},
    onRest: () => setLoading(false),
  });
 const handleUnmount = () => {
  console.log("Click")
  if (countDone) {
    setUnmount(true)
    // setTimeout(() => setUnmount(), 4000);
  }
 }


  //Counter

  useEffect(() => {
    if (!countDone) {
      if (Number.isInteger(counter / 5)) {
        setArray((array) => [...array, counter]);
      }
      //Prevents gap in svg circle on completion
      if (counter === 99) {
        setArray((array) => [...array, 100]);
      }
      setTimeout(() => setCounter(counter + 1), 30);
    }
    if (counter >= 99) {
      setCountDone(true);
    }
  }, [counter]);

  let radius = 30;

  let stroke = 1;
  let progress = counter;

  let normalizedRadius = radius - stroke * 2;

  let circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  //  ANIMATIONS

  //Animated Ring
  let numAnimated = 3;

  const [fade, setFade] = useState([]);

  //Using refs could be extremely costly. Might want to change to an array?
  useEffect(() => {
    //Setting Grouped Refs
    setFade((fade) =>
      Array(numAnimated)
        .fill()
        .map((el, i) => fade[i] || [i])
    ); 
  }, []);


  const fadeIn = useSprings(
    fade.length,
    fade.map((el, i) =>
      !countDone
        ? {
            from: {
              opacity: 0,
              transform: `translateY(+20px) scale(${i === 0 ? 3 : 1})`,
            },
            to: {
              opacity: 1,
              transform: `translateY(0) scale(${i === 0 ? 4 : 1.2})`,
            },

            delay: (220 * i),
            config: { mass: 1, tension: 120, friction: 40 },
          }
        : {
            from: {
              transform: `translateY(0) scale(${i === 0 ? 4 : (i === 1 ? 1.2 : 1)})`,
              opacity: 1,
            },
            to: {
              transform: `translateY(0) scale(${i === 0 ? 30 : (i === 1 ? 1.8 : 1)})`,
              opacity: 0,
            },

            delay: i === 1 ? (220 * i) : 260,
            config: { mass: 3, tension: 280, friction: 60 },
          }
    )
  );

  //Animated Letters
  const letters = ["c", "a", "n", "i", "s"];
  const lettersRef = useSpringRef();

  const lettersSprings = useSprings(
    letters.length,
    letters.map(
      (el, i) =>
        countDone && {
          from: {
            opacity: 0,
            transform: "translateY(+20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },

          delay: 900 + 180 * i,
          config: {
            // mass: 1,
            // tension: 280,
            // friction: 18
          },
          lettersRef,
          onRest: () => {
            // if (i=== letters.length-1 ) {
            //   setLoading(false);
            // }
          }
        }
    )
  );
  //OTHER ANIMATIONS

  const [flip, set] = useState(false)
  const bounce = useSpring({
    reset: true,
    reverse: flip,
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {duration: 800},
    onRest: () => set(!flip),
  });
  const subtitle = useSpring({
    opacity: countDone ? 1 : 0,
    delay: 1800,
  });

let mode = "dark";

  return (
    <a.div id="loader" style={fadeOut} onClick={()=> handleUnmount()}>
        <a.div className="svg-c" style={fadeIn[0]}>
          <svg className="svg-path" height={radius * 2} width={radius * 2}>
            <circle
              stroke={mode === "light" ? "#404040" : "#f4f4f4"}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{ strokeDashoffset }}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <svg className="svg-back" height={radius * 2} width={radius * 2}>
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

        <a.div className="loader-inner-c" style={fadeIn[1]}>
          <h1 className="loader-num">{array.slice(-1)}%</h1>
        </a.div>

        <div className="header-c">
          <div className="letters-c">
            {lettersSprings.map((el, i) => {
              return (
                <a.h1 className="letter" key={i} style={lettersSprings[i]}>
                  {letters[i]}
                </a.h1>
              );
            })}
          </div>

          <a.h4 className="subtitle" style={subtitle}>
            a ual group project
          </a.h4>
        </div>
     
        {!countDone ? <a.div className="loader-text-c" style={fadeIn[2]}>
          <a.p className="loader-text" style={bounce}>
            Loading...
          </a.p>
        </a.div> :
         <a.div className="loader-text-c" >
          <a.p className="loader-text" style={bounce}>
            Tap anywhere to continue.
          </a.p>
        </a.div>
}
    </a.div>
  );
}

export default Loader;
