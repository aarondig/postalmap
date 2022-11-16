import React, {
  useState, useEffect,
} from "react";
import "./style.css";
import {data} from "../../../../data"
import { InView } from "react-intersection-observer";

function Image({i, el,  section, setCurrent}) {
  const [inView, setInView] = useState();

  useEffect(()=>{
    inView && setCurrent(i)
  },[inView])


  return <div id="image" ref={section}>
    <InView onChange={setInView} threshold={.6}>
 
       
          <div className="image-c">
            <img className="image" src={el.src}/>
     
   
      </div>
      
      </InView>
  </div>
}

export default Image;

