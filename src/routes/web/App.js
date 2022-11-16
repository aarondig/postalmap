import { useRef, useState, useEffect } from 'react';
import './App.css';
import Wrapper from '../../components/ui/atoms/Wrapper';
import Module from '../../components/ui/organisms/module';
import Project from './pages/project';
import Loader from './pages/Loader';
import Navigation from '../../components/ui/molecules/Navigation';


function App() {

// Startup Function
// const [projectHeight, setProjectHeight] = useState(0)
const [current, setCurrent] = useState(0)
const [loading, setLoading] = useState(true);


const [audio, setAudio] = useState(false)


  // SCROLL RIG
  const scrollContainer = useRef()
  const scrollContent = useRef()
  // const [scroll, setScroll] = useState([])
  const [scroll, setScroll] = useState()
  
    const onScroll = (e) => {
      setScroll(e.target.scrollTop);
      // setScroll((scroll) => [...scroll, e.target.scrollTop]);
    };



        //GET PAGE SIZE


let windowWidth, containerHeight;

let position = 0;
let target = 0
let ease = 0.1;



function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}



function setTransform(el, transform) {
  el.current.style.transform = transform
}


useEffect(()=>{
  windowWidth = window.innerWidth;
  containerHeight = scrollContainer.current.getBoundingClientRect().height;
  smoothScroll()
  // document.body.style.height = `${containerHeight}px`
},[])
  
function smoothScroll() {
  position = lerp(current,target,ease)
  position = parseFloat(position.toFixed(2))
  target = scroll;
  

  setTransform(scrollContent, `translateY(${-position}px)`)
  requestAnimationFrame(smoothScroll)
}


console.log(window.scrollY)
    

    // const [scroll, setScroll] = useState({
    //   values: [],
    //   count: 0,
    //   direct: 1
    // })
    
    //   const onScroll = (e) => {
    //     setScroll({
    //      values: [...scroll.values, e.target.scrollTop],
    //      count: e.target.scrollTop,
    //      direct: scroll.values.slice(-1) < e.target.scrollTop ? 1 : -1});
    //   };
    

    useEffect(() => void onScroll({ target: scrollContainer.current }), []);
   



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
  // pagesize: pagesize,
  scrollContainer: scrollContainer,
  scrollContent: scrollContent,
  // setProjectHeight: setProjectHeight,
  onScroll: onScroll,
  setCurrent: setCurrent,
}

const module = {
  scroll: scroll,
  current: current,
  audio: audio,
}
const navigation = {
  current: current,
  audio: audio,
  setAudio: setAudio,

}


  return (
    <div className="App">
    <Wrapper {...wrapper}>
<Navigation {...navigation}/>




    {/* {loading && <Loader {...loader}/>} */}
  
      
        <Project {...project}/>

  

        <Module {...module}/>
   
    </Wrapper>
   
    </div>
  );
}

export default App;
