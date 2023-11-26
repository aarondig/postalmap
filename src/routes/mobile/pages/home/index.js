import React, { useState, useEffect, createRef, Suspense } from "react";
import "./style.css";
//   a,
//   useSpring,
//   useSprings,
//   useSpringRef,
//   useTransition,
// } from "react-spring";
import { a, easings } from "react-spring";
import { useSpring, useSprings, a as Animated } from "@react-spring/three";
import { data } from "../../../../data";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
// import Loader from "../Loader";

const Scene = React.lazy(() => import("./scene"));

function Home({ current, setCurrent, basename }) {
  //Startup Function
  const [loaded, setLoaded] = useState(false);

  let modelcount = [];
  const [models, setModels] = useState([]);

  useEffect(() => {
    //Setting Grouped Refs

    {
      data.map((el, i) => {
        let count = 0;
        modelcount.push(count + i);
      });
    }
    setModels((models) =>
      Array(modelcount.length)
        .fill()
        .map((el, i) => models[i] || createRef())
    );

    setLoaded(true);
  }, []);

  //Selecting Page
  const handleNext = () => {
    if (current >= models.length - 1) {
      setCurrent(0);
    }
    if (current < models.length - 1) {
      setCurrent(current + 1);
    }
  };
  const handlePrev = () => {
    if (current <= 0) {
      setCurrent(models.length - 1);
    }
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // Navigating to Page
  const navigate = useNavigate();
  const handleEnter = () => {
    navigate(`${data[current].id}`);
  };
  // Swipeable
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  // Animations
  const slideup = useSpring({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0vh)" : "translateY(100vh)",
    delay: 100,
    config: {
      duration: 1200,
      tension: 120,
      friction: 14,
      easing: easings.easeInBounce,
    },
  });

  const line1 = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 300,
    delay: 1150,
    config: { duration: 350, tension: 120, friction: 14 },
  });
  const line2 = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 400,
    delay: 1300,

    config: { duration: 350, tension: 120, friction: 14 },
  });
  const line3 = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: { opacity: 1, transform: "translateY(0px)" },
    // delay: 400,
    delay: 1450,

    config: { duration: 350, tension: 120, friction: 14 },
  });

  const textSprings = useSprings(
    models.length,
    models.map((el, i) =>
      i === current
        ? {
            from: { opacity: 0 },
            to: { opacity: 1 },
          }
        : {
            from: { opacity: 1 },
            to: { opacity: 0 },
          }
    )
  );
  const indexSprings = useSprings(
    models.length,
    models.map((el, i) =>
      i === current
        ? {
            from: { opacity: 0.1 },
            to: { opacity: 1 },
          }
        : {
            from: { opacity: 1 },
            to: { opacity: 0.1 },
          }
    )
  );

  const scene = {
    models: models,
    current: current,
    loaded: loaded,
    setLoaded: setLoaded,
  };

  let count = -1;
  return (
    <div id="home">
      <a.div className="section-wrap" style={slideup} {...handlers}>
        <div className="info-c">
          {data.map((el, i) => {
            if (el.type === "view") {
              count++;
              return (
                <a.div className="text-c" key={i} style={textSprings[count]}>
                  <a.h6
                    className="title"
                    style={line1}
                    onClick={() => handleEnter()}
                  >
                    {el.title}
                  </a.h6>
                  <a.p className="text" style={line2}>
                    {el.text}
                  </a.p>
                </a.div>
              );
            }
          })}
        </div>
        <a.div className="row" style={line3}>
          <div className="order-btns">
            <div className="order-btn prev" onClick={() => handlePrev()}>
              <p>Prev</p>
            </div>
            <div className="order-btn">
              <p>/</p>
            </div>
            <div className="order-btn next" onClick={() => handleNext()}>
              <p>Next</p>
            </div>
          </div>
          <ul className="index-c">
            {indexSprings.map((el, i) => {
              return (
                <a.div
                  className="index"
                  key={i}
                  style={indexSprings[i]}
                  onClick={() => setCurrent(i)}
                >
                  <div className="index-line" />
                </a.div>
              );
            })}
          </ul>
        </a.div>
      </a.div>
      <Suspense fallback={<p>loading</p>}>
        <Scene {...scene} />
      </Suspense>
    </div>
  );
}

export default Home;
