import React, {
  useState, useEffect,
} from "react";
import "./style.css";
import {data} from "../../../../data"
import { InView } from "react-intersection-observer";
import { a, useSpring } from "react-spring";

function Video({i, el,  section, setCurrent}) {
  const [inView, setInView] = useState();
  const [audio, setAudio] = useState();

  useEffect(()=>{
    inView && setCurrent(i)
  },[inView])

  const overlay = useSpring({
   opacity: audio ? 0 : .6,
  })
  const overlaytext = useSpring({
    opacity: audio ? 0 : 1,
   })


  return <InView id="video" ref={section} onChange={setInView} threshold={.6}>
 
       
          <div className="video-c" onClick={()=> setAudio(!audio)}>
          <div className="video-overlay-c">
          <a.h6 className="subtitle" style={overlaytext}>Tap to Listen</a.h6>
             
          
            <a.div className="video-overlay" style={overlay}>
              
            </a.div>
            </div>
            <video className="video" src={el.src} type="video" autoPlay loop muted={audio ? false : true} height="100%"/>
     
   
      </div>
      
  </InView>
}

export default Video;

