import { useRef, useState, useEffect } from 'react';
import './App.css';
import Wrapper from '../../components/ui/atoms/Wrapper';
import Module from '../../components/ui/organisms/module';
import Project from './pages/project';
import Loader from './pages/Loader';
import Navigation from '../../components/ui/molecules/Navigation';


function App() {

// Startup Function
const [projectHeight, setProjectHeight] = useState(0)


const [loading, setLoading] = useState(true);



const handleStart = () => {
  
}

  // SCROLL RIG
  const scrollArea = useRef()
  // const [scroll, setScroll] = useState([])
  const [scroll, setScroll] = useState(0)
  
    const onScroll = (e) => {
      setScroll(e.target.scrollTop);
      // setScroll((scroll) => [...scroll, e.target.scrollTop]);
    };
    

    useEffect(() => void onScroll({ target: scrollArea.current }), []);
   

    //GET PAGE SIZE
 const pagesize = useRef();

useEffect(() => {
  // pagesize.current.getBoundingClientRect();
  
},[])

const loader = {
loading: loading,
setLoading: setLoading,
handleStart: handleStart,
}
const wrapper = {
  // scrollArea: scrollArea,
  // setScroll: setScroll,
}
const module = {
  scroll: scroll
}
const project = {
scroll: scroll,
  // pagesize: pagesize,
  scrollArea: scrollArea,
  setProjectHeight: setProjectHeight,
  onScroll: onScroll,
}

  return (
    <div className="App">
    <Wrapper {...wrapper}>
<Navigation/>




    {/* {loading && <Loader {...loader}/>} */}
  
      
        <Project {...project}/>

  
   <Module {...module}/>
      
   
    </Wrapper>
   
    </div>
  );
}

export default App;
