import React, { useState, useRef, Suspense, useEffect, createRef } from "react";
import "./style.css";
import Description from "../../sections/description";
import { data } from "../../../../data.js";
import View from "../../sections/view";
import Image from "../../sections/image";

function Project({ scrollArea, setProjectHeight, onScroll, scroll }) {
  const [section, setSection] = useState([]);
  const [sectionSize, setSectionSize] = useState([]);

  useEffect(() => {
    //Setting Grouped Refs
    setSection((section) =>
      Array(data.length)
        .fill()
        .map((el, i) => section[i] || createRef())
    );
  }, []);
  useEffect(() => {
    if (section.length === data.length) {
      let height = 0;
      section.map((el, i) => {
        let sectsize = el.current.getBoundingClientRect();
        setSectionSize((sectionSize) => [...sectionSize, sectsize]);

        height += sectsize.height;

        setProjectHeight(height);
      });
    }
  }, [section]);

  return (
    <div id="project" ref={scrollArea} onScroll={onScroll}>
      <div className="section-spacer-c" >
      {data.map((el, i) => {
        switch (el.type) {
          default: {
            return <div className="space" key={i} />;
          }
          case "text": {
            return (
              <div className="text-b" />

            );
          }
          case "view": {
            return (
                <div className="view-b" />
        
            );
          }
          case "image": {
            return (
                <div className="image-b" />
            );
          }
        }
      })}
      </div>
      {data.map((el, i) => {
        switch (el.type) {
          default: {
            return <div className="space" key={i} />;
          }
          case "text": {
            return (
              <>
                {/* <div className="text-b" /> */}
                <Description key={i} el={el} section={section[i]} scrollArea={scrollArea} scroll={scroll}/>
              </>
            );
          }
          case "view": {
            return (
              <>
                
                <View key={i} el={el} section={section[i]} scrollArea={scrollArea} scroll={scroll}/>
                {/* <div className="view-b" /> */}
              </>
            );
          }
          case "image": {
            return (
              <>
          
                {/* <div className="image-b" /> */}
                <Image key={i} el={el} section={section[i]} scrollArea={scrollArea} scroll={scroll}/>
                
              </>
            );
          }
        }
      })}
    </div>
  );
}

export default Project;
