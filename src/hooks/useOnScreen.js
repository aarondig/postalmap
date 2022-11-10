// import React, {
//   useMemo, useEffect, useState
// } from "react";

// export default function useOnScreen(ref) {
//     const [isIntersecting, setIntersecting] = useState(false)
  
//     const observer = useMemo(() => new IntersectionObserver(
//       ([entry]) => setIntersecting(entry.isIntersecting)
//     ))
  
//     useEffect(() => {
//       observer.observe(ref.current)
//       // Remove the observer as soon as the component is unmounted
//       return () => { observer.disconnect() }
//     }, [])
  
//     return isIntersecting
//   }

import { useEffect, useState, useRef } from 'react';

export default function useOnScreen(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
