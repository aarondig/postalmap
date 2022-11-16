import { useState, useEffect, useRef, createRef, Suspense } from "react";
import Web from "./routes/web/App";
import Mobile from "./routes/mobile/App";

function Router() {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
      setWidth(window.innerWidth);
  }
  useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
          window.removeEventListener('resize', handleWindowSizeChange);
      }
  }, []);
  
  const isMobile = width <= 768;

  return (
   <>
   <Mobile/>
      {/* {!isMobile ? 
      <Web/> :
      <Mobile/>
      } */}
      </>
  );
}

export default Router;
