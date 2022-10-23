import React, {
  useState, useRef, Suspense, useEffect
} from "react";
import "./style.css";
import { useProgress } from '@react-three/drei'

function Loader({loading, setLoading}) {
  // const { progress } = useProgress();
  const [counter, setCounter] = useState(0);
  const [array, setArray] = useState([]);

  
  useEffect(() => {
    if (loading) {
      if (Number.isInteger(counter / 10)) {
        setArray(array => [...array, counter])
      }
      //Prevents gap in svg circle on completion
      if (counter === 99) {
        setArray(array => [...array, 100])
      }
      setTimeout(() => setCounter(counter + 1), 10);
    }
    if (counter >= 99) {
      setLoading(false);
    }
  }, [counter]);

  let radius = 30;
 
  let stroke = 1;
  let progress = counter;

  let normalizedRadius = radius - stroke * 2;

  let circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;






// console.log(loading)
// console.log(counter)
  return <div id="loader">
    <div className="svg-c">
    <svg className="svg-path" height={radius * 2} width={radius * 2}>
          <circle
            stroke="#404040"
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
            stroke="#f4f4f4"
            fill="transparent"
            strokeWidth={stroke}

            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        
        {/* <svg className="checkmark-svg" height={radius/.58} width={radius/.58}>
        {!loading && <path className="checkmark-svg" stroke="#404040" fill="none" strokeWidth={stroke} strokeDasharray={10} d="M14.1 27.2l7.1 7.2 16.7-16.8"/>}
          
         
          </svg> */}
          </div>
          <div className="loader-text-c">
          <h1 className="loader-num">{array.slice(-1)}%</h1>
        </div>
  
  </div>
}

export default Loader;


