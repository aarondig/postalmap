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


 //For Models to appear/disappear
 const [isInView, setIsInView] = useState()




const [audio, setAudio] = useState(false)


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
}

const module = {
  scroll: scroll,
  direct: direct,

  current: current,
  audio: audio,
  isInView: isInView,
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
