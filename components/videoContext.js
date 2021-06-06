import React, { useState, useContext } from "react";

const VideoContext = React.createContext();

export const useVideo = () => {
  return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
  const [listUpdated, setListUpdated] = useState(false);
  return (
    <VideoContext.Provider value={{ listUpdated, setListUpdated }}>
      {children}
    </VideoContext.Provider>
  );
};
