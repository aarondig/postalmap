import React, {
  useState,
  useRef,
  Suspense,
  useEffect,
  createRef,
  useLayoutEffect,
} from "react";
import "./style.css";
import Description from "../../sections/description";
import { data } from "../../../../data.js";
import View from "../../sections/view";
import Image from "../../sections/image";
import Detail from "../../sections/detail";
import Module from "../../../../components/ui/organisms/module";
import Slider from "../../sections/slider";

function Project({
  scroll,
  onScroll,
  scrollContainer,
  sections,
  setSection,
  setIsInView,
  sectionSize,
  current,
  setCurrent,
}) {
  // const [sections, setSection] = useState([]);
  // const [sectionSize, setSectionSize] = useState([]);

  // const [projectHeight, setProjectHeight] = useState();

 
  // useEffect(() => {
  //   //Setting Grouped Refs
  //   setSection((sections) =>
  //     Array(data.length)
  //       .fill()
  //       .map((el, i) => sections[i] || createRef())
  //   );
  // }, []);

  // // Getting size of each section
  // useEffect(() => {
  //   if (sections.length === data.length) {
  //     let height = 0;
  //     sections.map((el, i) => {
  //       let sectsize = el.current.node.getBoundingClientRect().height;
  //       setSectionSize((sectionSize) => [...sectionSize, sectsize]);

  //       height += sectsize.height;
  //       setProjectHeight(height);
  //     });
  //   }
  // }, [sections]);

  //START UP

  useEffect(() => {
    // Setting Index for Each
    data.map((el, i) => {
      el.index = i;
    });
  }, []);

  const view = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    current: current,
    setIsInView: setIsInView,
    setCurrent: setCurrent,
    sectionSize: sectionSize,
  };

  const text = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
  };
  const detail = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
    sectionSize: sectionSize,
  };

  const image = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setCurrent: setCurrent,
  };
  // const module = {
  //   scroll: scroll,
  //   // direct: direct,
  //   sectionSize: sectionSize,
  //   current: current,
  //   // audio: audio,
  //   // isInView: isInView,
  // }

  return (
    <div id="project" ref={scrollContainer} onScroll={onScroll}>
      {data.map((el, i) => {
        switch (el.type) {
          default: {
            return <div className="space" key={i} />;
          }
          case "text": {
            return (
              <Description
                key={i}
                i={i}
                el={el}
                section={sections[i]}
                {...text}
              />
            );
          }
          case "view": {
            return (
              <View key={i} i={i} el={el} section={sections[i]} {...view} />
            );
          }
          case "image": {
            return (
              <Image key={i} i={i} el={el} section={sections[i]} {...image} />
            );
          }
          case "detail": {
            return (
              <Detail key={i} i={i} el={el} section={sections[i]} {...detail} />
            );
          }
          case "slider": {
            return (
              <Slider key={i} i={i} el={el} section={sections[i]} {...detail} />
            );
          }
        }
      })}
      {/* <Module {...module}/> */}
    </div>
  );
}

export default Project;
