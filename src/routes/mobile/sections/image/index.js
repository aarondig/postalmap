import React, {
  useState, useEffect,
} from "react";
import "./style.css";
import {data} from "../../../../data"
import { InView } from "react-intersection-observer";
import { a, useSpring } from "react-spring";

function Image({i, el,  section, setVisibleSection}) {
  const [inView, setInView] = useState();

  useEffect(()=>{
    inView && setVisibleSection(i)
  },[inView])


   const opacity = useSpring({
    opacity: inView ? 1 : 0,
    // delay: 100,
    config: { duration: 250 },
  });

  return <InView id="image" ref={section} onChange={setInView} threshold={1}>

      
          <div className="image-c">
          <div className="image-overlay-c">
          {/* <h6 className="subtitle">Tap to Listen</h6> */}
             
         
            <div className="image-overlay">
              
            </div>
            
            </div>
            <img className="image" src={el.src} type="image"/>
     
   
      </div>
      <div className="parallax-back" />

      
  </InView>
}

export default Image;

