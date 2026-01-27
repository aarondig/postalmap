import { useState, useEffect, useRef, createRef, Suspense } from "react";
import Mobile from "./routes/mobile/App";
import MobileShell from "./components/wrappers/MobileShell";
import {BrowserRouter as Routes} from "react-router-dom"

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

  return (
   <Routes>
      <MobileShell>
        <Mobile/>
      </MobileShell>
    </Routes>
  );
}

export default Router;
