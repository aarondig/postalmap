import React, {
  useState,
  useRef,
  Suspense,
  useEffect,
  createRef,
  useLayoutEffect,
} from "react";
import "./style.css";

const Scroller = React.lazy(() =>
  import("../../../../components/ui/organisms/scroller")
);
const Module = React.lazy(() =>
  import("../../../../components/ui/organisms/module")
);

function Page({
  i,
  el,
  current,
  setCurrent,
  audio,
  audioRef,
  visibleSection,
  setVisibleSection,
}) {
  // SCROLL RIG
  const scrollContainer = useRef();
  const [scroll, setScroll] = useState();

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
    setCurrent: setCurrent,
    scroll: scroll,
    onScroll: onScroll,
    setScroll: setScroll,
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
  console.log(scroll)
  const module = {
    i: i,
    el: el,
    scroll: scroll,

    current: current,
    // isInView: isInView,
    sectionSize: sectionSize,

    audio: audio,
    audioRef: audioRef,
  };
  return (
    <div id="page">
      <Scroller {...scroller} />

        <Module {...module} />
    </div>
  );
}

export default Page;
