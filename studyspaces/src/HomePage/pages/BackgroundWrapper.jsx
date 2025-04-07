// src/components/BackgroundWrapper.jsx
import React, { useEffect } from "react";

const BackgroundWrapper = ({ children }) => {
  useEffect(() => {
    const savedImage = localStorage.getItem("userBackgroundImage");
    const appContainer = document.querySelector(".app-container");

    if (savedImage && appContainer) {
      appContainer.style.backgroundImage = `url(${savedImage})`;
      appContainer.style.backgroundSize = "cover";
      appContainer.style.backgroundPosition = "center";
      appContainer.style.backgroundColor = "transparent";
    }

    return () => {
      // Clear the background if user navigates away
      if (appContainer) {
        appContainer.style.backgroundImage = "none";
        appContainer.style.backgroundColor = "";
      }
    };
  }, []);

  return <div className="app-container">{children}</div>;
};

export default BackgroundWrapper;
