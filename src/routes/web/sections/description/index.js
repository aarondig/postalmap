import React, {
  useState, useRef, Suspense, useEffect
} from "react";
import "./style.css";
import {data} from "../../../../data"
import {a, useSpring } from "react-spring";
import useOnScreen from "../../../../hooks/useOnScreen";

function Description({i, el, section, slow3, scrollArea, scroll}) {
  const content = useRef();
  // const [isVisible, setIsVisible] = useState(false);

  // let options = {
  //   root: scrollArea.current,
  //   rootMargin: '150px',
  //   threshold: 1.0
  // }
  
  // let callback = (entries, observer) => {
  //     setInView(entries[0].isIntersecting)
  //     console.log(inView)
 
  // }


  const isVisible = useOnScreen(content)
// console.log(section)
// useEffect(()=>{
//   if(inView) {
//     setIsVisible(true)
//   }
  
// },[inView])
  


 const visible = useSpring({ opacity: isVisible ? 1 : 0,
  delay: 400,
config: { duration: 250,  } })
  
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
  
  


  useEffect(()=>{

  },[scroll])



  return <div id="description" ref={section} >
   {/* style={visible} */}
      {/* <div className="background-c">
      <div className="background"></div>
      </div> */}
      <div className="section-wrap" >
    <div className="row">
        <div className="col-3">
          <a.div className="text-c" ref={content} style={visible}>
            <h6 className="subtitle">/ {el.subtitle}</h6>
            <h2 className="title">{el.title}</h2>
            <p className="text">{el.text}</p>
          </a.div>
        </div>
        {/* <div className="col-1"></div> */}
      </div>

   
      </div>
  </div>
}

export default Description;

