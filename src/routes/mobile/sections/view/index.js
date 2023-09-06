import React, { useState, useEffect, useRef, Suspense, useMemo } from "react";
import "./style.css";
import { InView, useInView } from "react-intersection-observer";
import { data } from "../../../../data";
import { serialize } from "cheerio/lib/api/forms";
import { useLocation, useNavigate } from "react-router-dom";

function View({
  i,
  el,
  section,
  current,
  setCurrent,
  visibleSection,
  setVisibleSection,
  sectionSize,
  scroll,
  basename,
}) {
  const handleVisible = (inView, entry) => {
    if (inView) {
      // setIsInView(inView)
      setVisibleSection(i);
    }
  };
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname.split("/");

 
  const handleNext = () => {

    if (current >= data.length - 1) {
      navigate(`../${url[1]}/${data[0].id}`, { replace: true });
      setCurrent(0);
      // navigate(`${data[0].id}`)
    }
    if (current < data.length - 1) {
      navigate(`../${url[1]}/${data[current + 1].id}`, { replace: true });
      setCurrent(current + 1);
      
    }
  };
  const handlePrev = () => {
    if (current <= 0) {
      navigate(`../${url[1]}/${data[data.length - 1].id}`, { replace: true });
      setCurrent(data.length - 1);
    }
    if (current > 0) {
      navigate(`../${url[1]}/${data[current - 1].id}`, { replace: true });
      setCurrent(current - 1);
    }
  };

  return (
    <InView id="view" ref={section}>
      <InView
        className="inView"
        onChange={(inView, entry) => handleVisible(inView, entry)}
        threshold={0.6}
      >
        <div className="section-wrap">
          {/* <div className="content-box"> */}
          <div className="row">
            <div className="col-2">
              <div className="text-c">
                <h6 className="subtitle">
                  / {el.number} {el.subtitle}
                </h6>
                <h2 className="title">{el.title}</h2>
                <div className="order-btns row">
                  <div className="order-btns">
                    <div
                      className="order-btn prev"
                      onTouchEnd={(e) => handlePrev(e)}
                      // onClick={(e) => handlePrev(e)}
                    >
                      <p>Prev</p>
                    </div>
                    <div className="order-btn">
                      <p>/</p>
                    </div>
                    <div
                      className="order-btn next"
                      onTouchEnd={(e) => handleNext(e)}
                      // onClick={(e) => handleNext(e)}
                    >
                      <p>Next</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>
      </InView>
    </InView>
  );
}

export default View;
