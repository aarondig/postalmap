import React, {
  useState, useEffect,
} from "react";
import "./style.css";
import {data} from "../../../../data"
import { InView } from "react-intersection-observer";

function Image({i, el,  section, setCurrent}) {
  const [inView, setInView] = useState();

  useEffect(()=>{
    setCurrent(i)
  },[inView])


  return <div id="image" ref={section}>
    <InView onChange={setInView}>
    <div className="section-wrap">
 
       
          <div className="image-c">
            <img className="image" src={el.src}/>
     
   
      </div>
      </div>
      </InView>
  </div>
}

export default Image;

