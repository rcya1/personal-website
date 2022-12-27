import React, { useState, useEffect } from 'react'

export interface BasicProps {
  children: React.ReactNode
}

function getWindowDimensions() {
  if (typeof window === 'undefined') {
    return { width: 1000, height: 1000 }
  }

  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowDimensions;
}
