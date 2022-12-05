import { useRef, useState, useEffect, createRef } from 'react';
import './App.css';
import Wrapper from '../../components/ui/atoms/Wrapper';
import Module from '../../components/ui/organisms/module';
import Project from './pages/project';
import Loader from './pages/Loader';
import Navigation from '../../components/ui/molecules/Navigation';
import Intro from './pages/intro';

import {data} from '../../data'

function App() {

// Startup Function
// const [projectHeight, setProjectHeight] = useState(0)
const [current, setCurrent] = useState(0)
const [loading, setLoading] = useState(true);


// Setting Sections for Project page
const [sections, setSection] = useState([]);
  const [sectionSize, setSectionSize] = useState([]);

  const [projectHeight, setProjectHeight] = useState();


  useEffect(() => {
    //Setting Grouped Refs
    setSection((sections) =>
      Array(data.length)
        .fill()
        .map((el, i) => sections[i] || createRef())
    );
  }, []);

  // Getting size of each section
  useEffect(() => {
    if (sections.length === data.length) {
      let height = 0;
      sections.map((el, i) => {
        let sectsize = el.current.node.getBoundingClientRect().height;
        setSectionSize((sectionSize) => [...sectionSize, sectsize]);

        height += sectsize.height;
        setProjectHeight(height);
      });
    }
  }, [sections]);
  


 //For Models to appear/disappear
 const [isInView, setIsInView] = useState()


// AUDIO
const audioRef = useRef();
//Sets whether audio is heard in scenes
const [audio, setAudio] = useState(false)

// useEffect(() => {
//   //Setting Grouped Refs for audio
//   setSection((sections) =>
//     Array(data.length)
//       .fill()
//       .map((el, i) => sections[i] || createRef())
//   );
// }, []);





  // SCROLL RIG
  const scrollContainer = useRef()
  const scrollContent = useRef()
  const [scroll, setScroll] = useState()
  const [direct, setDirect] = useState(1)
  
    const onScroll = (e) => {
      setScroll(e.target.scrollTop);

    };

    useEffect(() => void onScroll({ target: scrollContainer.current }), []);
   


    // window.addEventListener('wheel', function(event)
    // {
    //  if (event.deltaY < 0)
    //  {

    //   setDirect(-1)
    //  }
    //  if (event.deltaY > 0)
    //  {
   
    //   setDirect(1)
    //  }
    // });


const loader = {
loading: loading,
setLoading: setLoading,
// handleStart: handleStart,
}
const wrapper = {
  // scrollContainer: scrollContainer,
  // setScroll: setScroll,
}
const project = {
scroll: scroll,
direct: direct,
  // pagesize: pagesize,
  scrollContainer: scrollContainer,
  scrollContent: scrollContent,
  // setProjectHeight: setProjectHeight,
  onScroll: onScroll,
  current: current,
  setCurrent: setCurrent,

  setIsInView: setIsInView,

  sections: sections,
  setSection: setSection,
  sectionSize: sectionSize,

}

const module = {
  scroll: scroll,
  direct: direct,

  current: current,
  isInView: isInView,
  sectionSize: sectionSize,

  audio: audio,
  audioRef: audioRef,
}
const navigation = {
  current: current,
  audio: audio,
  audioRef: audioRef,
  setAudio: setAudio,

}


  return (
    <div className="App">
    <Wrapper {...wrapper}>
<Navigation {...navigation}/>


{/* <Intro {...loader}/> */}
{/* 
      {loading && <Loader {...loader}/>} */}
  
      
        <Project {...project}/>

  

        <Module {...module}/>
   
    </Wrapper>
   
    </div>
  );
}

export default App;
