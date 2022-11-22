import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import "./style.css";
import {InView, useInView} from "react-intersection-observer";
import {data} from "../../../../data"
import { serialize } from "cheerio/lib/api/forms";


function View({ i, el, section, setCurrent, sectionSize, setIsInView, scroll}) {
const [isVisible, setVisible] = useState();
const parallax = useRef();

const [count, setCount] = useState(0);


// const [direct, setDirect] = useState(1)

// window.addEventListener('wheel', function(event)
// {
//  if (event.deltaY < 0)
//  {

//   setDirect(-1)
//  }
//  else if (event.deltaY > 0)
//  {

//   setDirect(1)
//  }
// });




// useEffect(()=>{
 
// if (isInView) {

//   if (direct === 1) {
//     setCount(Math.round(scroll - startValue));
//   }
//   if (direct === -1) {
//     setCount(Math.round(scroll - startValue));

//   }
// }
// if (!isInView) {
//  setCount(0);
// }

//   },[scroll])



const handleInView = (inView, entry) => { 
  // inView && setIsInView(i)
}

const handleVisible = (inView, entry) => { 
  setVisible(inView)
  if (inView) {
    setCurrent(i)
  }
}


  return (

    <InView id="view" ref={section} onChange={(inView, entry) => handleInView(inView, entry)}>
      <InView className="inView" onChange={(inView, entry) => handleVisible(inView, entry)} threshold={.6}>
        
        {/* <InView onChange={setInView} id="view" style={{transform: "translateZ(-1800px) scale(3.25)", width: "100%", height: "100%"}} > */}
      {/* <div className="section-wrap" ref={(element) => (slowFixed.current[i] = element)}> */}
      <div className="section-wrap" ref={parallax}>
      {/* <div className="content-box"> */}
      <div className="row"> 
        <div className="col-2">
          <div className="text-c">
            <h6 className="subtitle">{el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
      
      </div>
      
      </InView>
      </InView>

  );
}

export default View;
