import React, {
  useState,
  useRef,
  Suspense,
  useEffect,
  createRef,
  useLayoutEffect,
} from "react";
import "./style.css";
import Module from "../../../../components/ui/organisms/module";
import Scroller from "../../../../components/ui/organisms/scroller";

function Page({
  current,
  setCurrent,
audio,
  audioRef,
  visibleSection,
  setVisibleSection,
}) {

 // SCROLL RIG
  const scrollContainer = useRef()
  const [scroll, setScroll] = useState()
  
    const onScroll = (e) => {
      setScroll(e.target.scrollTop);

    };

    useEffect(() => void onScroll({ target: scrollContainer.current }), []);


// // Setting Sections for Project page
const [sections, setSection] = useState([]);
  const [sectionSize, setSectionSize] = useState([]);

  const [projectHeight, setProjectHeight] = useState();









  const scroller = {

    current: current,
    scroll: scroll,
    onScroll: onScroll,
    scrollContainer: scrollContainer,

    visibleSection: visibleSection,
    setVisibleSection: setVisibleSection,

    
    // isInView: isInView,
    // setIsInView: setIsInView,

    sections: sections,
    setSection: setSection,
    sectionSize: sectionSize,
    setSectionSize: setSectionSize,
    setProjectHeight: setProjectHeight,

    audio: audio,
    audioRef: audioRef,
  };

 

  const module = {
  scroll: scroll,

  current: current,
  // isInView: isInView,
  sectionSize: sectionSize,

  audio: audio,
  audioRef: audioRef,
}
  return (
    <div id="page">
      <Scroller {...scroller}/>
      
      <Module {...module}/>
    </div>
  );
}

export default Page;
