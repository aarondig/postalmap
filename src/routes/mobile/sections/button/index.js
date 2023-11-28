import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css";
import { data } from "../../../../data";
function Button({ i, el, section, current, setCurrent, scroll, setScroll }) {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname.split("/");

  const handleNext = () => {
    if (current >= data.length - 1) {
      setScroll(0);
      navigate(`../${url[1]}/${data[0].id}`, { replace: true });
      setCurrent(0);
      // navigate(`${data[0].id}`)
    }
    if (current < data.length - 1) {
      setScroll(0);
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

  const button = {
    id: "button",
    ref: section,
  };

  return (
    <div {...button}>
      {/* {data[i-1] && (data[i-1].type !== "detail" && <div className="top-spacer" />)} */}
      <div className="section-wrap">
        <div className="row">
     
            <div className="secondary-button-c" onTouchEnd={(e) => handlePrev(e)}>
              <h6 className="secondary-button-text">Prev</h6>

              <div className="button-visual"></div>
            </div>
         
       
  
            <div className="primary-button-c" onTouchEnd={(e) => handleNext(e)}>
              <h6 className="primary-button-text">Next</h6>

              <div className="button-visual"></div>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Button;
