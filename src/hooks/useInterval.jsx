import React, { useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(() => tick(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
