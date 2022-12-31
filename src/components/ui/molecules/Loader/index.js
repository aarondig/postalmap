import React, { useState, useRef, Suspense, useEffect } from "react";
import "./style.css";
import { Html, useProgress } from "@react-three/drei";

function Loader({ loaded, setLoaded }) {
  const { progress } = useProgress();
  let radius = 30;

  let stroke = 1;
  let amount = progress;

  let normalizedRadius = radius - stroke * 2;

  let circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (amount / 100) * circumference;
  useEffect(() => {
    if (progress === 100) {
      setLoaded && setLoaded(true);
    }
  }, [progress]);

  return (<Html center>
      <div className="loading-svg-c">
        <svg className="svg-path" height={radius * 2} width={radius * 2}>
          <circle
            stroke={"#f4f4f4"}
            fill={"transparent"}
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
            stroke={"#202020"}
            fill="transparent"
            strokeWidth={stroke}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
      </div>
    </Html>
  );
}

export default Loader;