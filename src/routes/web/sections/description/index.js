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
    setCurrent(i)
  },[inView])
  // let options = {
  //   root: scrollArea.current,
  //   rootMargin: '150px',
  //   threshold: 1.0
  // }
  
  // let callback = (entries, observer) => {
  //     setInView(entries[0].isIntersecting)
  //     console.log(inView)
 
  // }

 
// console.log(section)
// useEffect(()=>{
//   if(inView) {
//     setIsVisible(true)
//   }
  
// },[inView])
  



  
  // let observer = new IntersectionObserver(callback, options);
 
  // useEffect(()=>{
  //   if (section) {
  //   observer.observe(section.current)
  // }
  // },[section])
 
  // const [opa, setOpa] = useState(0)
  

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
    <div className="row">
        <div className="col-3">
        <InView onChange={setInView}>
          <div className="text-c">
            <a.h6 className="subtitle" style={line1}>/ {el.subtitle}</a.h6>
            <a.h2 className="title" style={line2}>{el.title}</a.h2>
            <a.p className="text" style={line3}>{el.text}</a.p>
          </div>
          </InView>
        </div>
        {/* <div className="col-1"></div> */}
      </div>

   
      </div>
     
  </div>
}

export default Description;

