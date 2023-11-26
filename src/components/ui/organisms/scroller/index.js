import React, {
  useState,
  useRef,
  Suspense,
  useEffect,
  createRef,
  useLayoutEffect,
} from "react";
import "./style.css";
import Text from "../../../../routes/mobile/sections/text";
import { data } from "../../../../data";
import View from "../../../../routes/mobile/sections/view";
import Video from "../../../../routes/mobile/sections/video";
import Image from "../../../../routes/mobile/sections/image";
import Detail from "../../../../routes/mobile/sections/detail";
import Module from "../module";
import Slider from "../../../../routes/mobile/sections/slider";
import Title from "../../../../routes/mobile/sections/title";
import Button from "../../../../routes/mobile/sections/button";

function Scroller({
  current,
  setCurrent,
  scroll,
  onScroll,
  setScroll,
  scrollContainer,
  
  setIsInView,
  visibleSection,
  setVisibleSection,

  sections,
  setSection,
  sectionSize,
  setSectionSize,
  setProjectHeight,

}) {
  



// // Setting Sections for Project page

  useEffect(() => {
    //Setting Grouped Refs
    setSection((sections) =>
      Array(data[current].sections.length)
        .fill()
        .map((el, i) => sections[i] || createRef())
    );
  }, []);

//   // Getting size of each section
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

  //START UP

  useEffect(() => {
    // Setting Index for Each
    data.map((el, i) => {
      el.index = i;
    });
  }, []);

  const view = {
    scroll: scroll,
    setScroll: setScroll,
    scrollContainer: scrollContainer,

    current: current,
    setCurrent: setCurrent,

    visibleSection: visibleSection,
    setIsInView: setIsInView,
    setVisibleSection: setVisibleSection,
    sectionSize: sectionSize,
  };

  const text = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setVisibleSection: setVisibleSection,

    data: data[current].sections,
  };
  const detail = {
    scroll: scroll,
    scrollContainer: scrollContainer,


    setVisibleSection: setVisibleSection,
    sectionSize: sectionSize,
    data: data[current].sections,
  };

  const image = {
    scroll: scroll,
    scrollContainer: scrollContainer,

    setVisibleSection: setVisibleSection,
  };

  return (
    <div id="scroller" ref={scrollContainer} onScroll={onScroll}>
      {data[current].sections.map((el, i) => {
        switch (el.type) {
          default: {
            return <div className="space" key={i} />;
          }
          case "title": {
            return (
              <Title
                key={i}
                i={i}
                el={el}
                section={sections[i]}
                {...text}
              />
            );
          }
          case "text": {
            return (
              <Text
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
          case "video": {
            return (
              <Video key={i} i={i} el={el} section={sections[i]} {...image} />
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
          case "button": {
            return (
              <Button key={i} i={i} el={el} section={sections[i]} {...view} />
            );
          }
        }
      })}
    </div>
  );
}

export default Scroller;
