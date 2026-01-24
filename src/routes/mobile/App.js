import React, { useRef, useState, useEffect, createRef, Suspense } from "react";
import "./App.css";
// import Wrapper from "../../components/ui/atoms/Wrapper";
// import Module from "../../components/ui/organisms/module";
// import Project from "./pages/project";
// import Loader from "./pages/Loader";
import Navigation from "../../components/ui/molecules/Navigation";
// import Intro from "./pages/intro";
// import TestCanvas from "./pages/testcanvas";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { data } from "../../data";
// import Home from "./pages/home";
// import Page from "./pages/page";
// import Startup from "./pages/startup";

const Home = React.lazy(() => import("./pages/home"));
const Page = React.lazy(() => import("./pages/page"));

function App() {
 
  const [current, setCurrent] = useState(0);
  
  // Displays which section is visible (USED TO BE Current but tells which section is currently visible)
  const [visibleSection, setVisibleSection] = useState([]);

  // // AUDIO
  //Sets whether audio is heard in scenes
  const [audio, setAudio] = useState(false);

  // Location Handling
  const location = useLocation();
  useEffect(() => {
    let url = location.pathname;

    data.map((el, i) => {
      if (url === `/${data[i].id}`) {
        setCurrent(i);

        return true;
      } else return false;
    });
    return;
  }, []);


  // useEffect(() => {
  //   let url = location.pathname;

  //   data.map((el, i) => {
  //     if (url === `/${basename}/${data[i].id}`) {
  //       setCurrent(i);

  //       return true;
  //     } else return false;
  //   });
  //   return;
  // }, [location.pathname]);

  // // Startup Function
  // // const [projectHeight, setProjectHeight] = useState(0)

  const [started, setStarted] = useState(false);
  useEffect(()=>{
  setStarted(true);
  },[])
  const [pointLoad, setPointLoad] = useState(false);
  const [loading, setLoading] = useState(true);

  const loader = {
  loading: loading,
  setLoading: setLoading,
  // handleStart: handleStart,
  }
  // const wrapper = {
  //   // scrollContainer: scrollContainer,
  //   // setScroll: setScroll,
  // }
  // const project = {
  // scroll: scroll,
  // direct: direct,
  //   // pagesize: pagesize,
  //   scrollContainer: scrollContainer,
  //   scrollContent: scrollContent,
  //   // setProjectHeight: setProjectHeight,
  //   onScroll: onScroll,
  //   current: current,
  //   setCurrent: setCurrent,

  //   setIsInView: setIsInView,

  //   sections: sections,
  //   setSection: setSection,
  //   sectionSize: sectionSize,

  // }
  const page = {
    current: current,
    setCurrent: setCurrent,
    audio: audio,
    visibleSection: visibleSection,
    setVisibleSection: setVisibleSection,
  };

  // const module = {
  //   scroll: scroll,
  //   direct: direct,

  //   current: current,
  //   isInView: isInView,
  //   sectionSize: sectionSize,

  //   audio: audio,
  //   audioRef: audioRef,
  // }
  const navigation = {
    current: current,
    setCurrent: setCurrent,

    audio: audio,
    setAudio: setAudio,

    visibleSection: visibleSection,
  };

  const home = {
    current: current,
    setCurrent: setCurrent,

    audio: audio,
  };

  const points = {
    started: started,
    pointLoad: pointLoad,
    setPointLoad: setPointLoad,
  }
 
  return (
    <div className="App">
      {/* <Wrapper {...wrapper}> */}
      <Navigation {...navigation} />

      {/* <Intro {...loader}/> */}
      <Suspense fallback={<p>loading</p>}>
      <Routes>

        <Route path="/" element={<Home {...home} />}>
        </Route>

        {data.map((el, i) => {

          return (
            <Route
              path={`/${data[i].id}`}
              element={<Page el={el} i={i} {...page} />}
              key={i}
            />
          );
        })}


      </Routes>
      </Suspense>

      
      {/* {started && 
      <TestCanvas {...points}/>
      }
       */}
      {/* {loading && <Loader {...loader}/>} */}

        {/* <Project {...project}/> */}

      {/* <Module {...module}/> */}

      {/* </Wrapper> */}
    </div>
  );
}

export default App;
