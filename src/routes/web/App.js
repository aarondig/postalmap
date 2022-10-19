import { useRef, useState, useEffect } from 'react';
import './App.css';
import Wrapper from '../../components/ui/atoms/Wrapper';
import Module from '../../components/ui/organisms/module';


function App() {
  const scrollArea = useRef()
  const [scroll, setScroll] = useState(0)

    const onScroll = (e) => {
      setScroll(e.target.scrollTop);
    };
    useEffect(() => void onScroll({ target: scrollArea.current }), []);
   
  
  

const wrapper = {
  // scrollArea: scrollArea,
  // setScroll: setScroll,
}
console.log(scroll)
  return (
    <div className="App">
    <Wrapper {...wrapper}>

 

      <div id="scroller" ref={scrollArea} onScroll={onScroll}> 
        <h2 className='test' >Hello my name is </h2>
        <div style={{ height: `${10 * 100}vh` }} />
    </div>
    <Module/>
      
   
    </Wrapper>
   
    </div>
  );
}

export default App;
