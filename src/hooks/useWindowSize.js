import { useState, useLayoutEffect } from 'react';

export const useWindowSize = (initValue = [0, 0]) => {
  const [size, setSize] = useState([...initValue]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};
