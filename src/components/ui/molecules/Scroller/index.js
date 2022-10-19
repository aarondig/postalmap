import { useRef, useState, useEffect } from 'react';
import "./style.css";

function Scroller({scrollArea, setScroll}){
  const onScroll = (e) => {
    setScroll(e.target.scrollTop);
  };
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
  <div id="scroller" ref={scrollArea} onScroll={onScroll}> 
      <h2 className='test' >Hello my name is </h2>
      <div style={{ height: `${10 * 100}vh` }} />
  </div>
  )
}
  export default Scroller;
