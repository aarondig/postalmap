import React, {
  useState, useEffect,
} from "react";
import "./style.css";
import {data} from "../../../../data"
import { InView } from "react-intersection-observer";
import { a, useSpring } from "react-spring";

function Video({i, el,  section, setVisibleSection}) {
  const [inView, setInView] = useState();
  const [audio, setAudio] = useState();

  useEffect(()=>{
    inView && setVisibleSection(i)
  },[inView])

  const overlay = useSpring({
   opacity: audio ? 0 : .6,
  })
  const overlaytext = useSpring({
    opacity: audio ? 0 : 1,
   })

   const opacity = useSpring({
    opacity: inView ? 1 : 0,
    // delay: 100,
    config: { duration: 250 },
  });

  return <InView id="video" ref={section} onChange={setInView} threshold={.6}>

       {/* <div className="parallax-back"/> */}
       {/* style={opacity} */}
          <a.div className="video-c" onClick={()=> setAudio(!audio)}>
          <div className="video-overlay-c">
          <a.h6 className="subtitle" style={overlaytext}>Tap to Listen</a.h6>
             
          
            <a.div className="video-overlay" style={overlay}>
              
            </a.div>
            </div>
            <video className="video" src={el.src} type="video" autoPlay loop playsInline webkit-playsinline="true" muted={audio ? false : true} height="100%"/>
     
   
      </a.div>
      
  </InView>
}

export default Video;

