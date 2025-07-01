import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// This custom hook allows us to use the navigate function outside of React components
let navigateFunction = null;

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigateFunction = navigate;
    return () => {
      // Clean up to prevent stale references
      if (navigateFunction === navigate) {
        navigateFunction = null;
      }
    };
  }, [navigate]);

  return navigate;
};

export const customNavigate = (path, options) => {
  if (navigateFunction) {
    // Use setTimeout to ensure navigation happens after current execution context
    setTimeout(() => {
      navigateFunction(path, options);
    }, 0);
  } else {
    console.error("Navigation function not available yet");
  }
};
