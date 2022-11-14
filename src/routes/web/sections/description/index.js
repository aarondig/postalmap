import React, {
  useState, useRef, Suspense, useEffect
} from "react";
import "./style.css";
import {data} from "../../../../data"
import {a, useSpring } from "react-spring";
import useOnScreen from "../../../../hooks/useOnScreen";
import {InView} from "react-intersection-observer";

function Description({i, el, section, setCurrent, slow3, scrollArea, scroll}) {
  const [inView, setInView] = useState(false);

  useEffect(()=>{
    inView && setCurrent(i);
  },[inView])

  const parallax = useRef();

  

  // useEffect(()=>{
    

  
  //     //If scroll is positive
  //     if (scroll.slice(-1) > scroll.slice(-2)) {
  // if (inView) {
      
      
  //     setOpa((opa + 1) * 1.2)
  //     content.current.style.opacity = opa / 250
  // }
  //     }
  //     if (scroll.slice(-1) < scroll.slice(-2)) {

      
      
  //       setOpa(opa <= .04 ? 0 : ((opa + 1) / 1.2))
  //       content.current.style.opacity = opa / 250
        
  //       }
        

  //       console.log(opa/250)
  //     //If scroll is negative

  //     // console.log(scroll.slice(-1) > scroll.slice(-2))
    
    
  // },[scroll])
  

  // ref={(element) => (slow3.current[i] = element)}

  // PARALLAX
//   const [scrollStart, setScrollStart] = useState(false)
//   useEffect(()=>{
//     if (inView) {
//       !scrollStart && setScrollStart(scroll);
//       parallax.current.style.transform = `translateY(${((scroll-scrollStart)*.3)}px)`
//     }
//   if (!inView) {
//     scrollStart && setScrollStart(false);
//   }
// // console.log(scroll + scrollStart)
//   },[scroll])

  //ANIMATIONS
  const line1 = useSpring({ opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" :  "translateY(20px)",
    delay: 400,
  config: { duration: 250,  } })
  const line2 = useSpring({ opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" :  "translateY(20px)",
    delay: 500,
  config: { duration: 250,  } })
  const line3 = useSpring({ opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" :  "translateY(20px)",
    delay: 600,
  config: { duration: 250,  } })





  return <div id="description" ref={section} >

      <div className="section-wrap" >
      <InView onChange={setInView} threshold={.6}>
    <div className="row">
        <div className="col-3">
        
          <div className="text-c" ref={parallax}>
            <a.h6 className="subtitle" style={line1}>/ {el.subtitle}</a.h6>
            <a.h2 className="title" style={line2}>{el.title}</a.h2>
            <a.p className="text" style={line3}>{el.text}</a.p>
          </div>
          
        </div>
        {/* <div className="col-1"></div> */}
      </div>

      </InView>
      </div>
     
  </div>
}

export default Description;

