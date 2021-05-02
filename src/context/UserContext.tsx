import React, { useState } from "react";

export const UserContext = React.createContext({
  token: "",
  username: "",
  isLogged: false,
  setContext: (context: any) => {},
});

export const UserContextProvider: React.FC = ({ children }) => {
  const setContext = (context: any) => {
    setContextState({ ...contextState, ...context });
  };

  const initState = {
    token: "",
    username: "",
    isLogged: false,
    setContext: setContext,
  };

  const [contextState, setContextState] = useState(initState);

  return (
    <UserContext.Provider value={contextState}>{children}</UserContext.Provider>
  );
};
