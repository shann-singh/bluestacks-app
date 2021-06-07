import React, { useState, useContext } from "react";

// purpose of this context is inter-component communication
// If more videos are added, using this context,
// all its children can have access to that information
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
