import React, { useState } from "react";

interface ContextState {
  show: boolean;
  message: string;
  type: "danger" | "success" | "warning";
}

export const NotificatorContext = React.createContext<
  ContextState & { setContext: (context: ContextState) => void }
>({
  show: false,
  message: "",
  type: "danger",
  setContext: (context: ContextState) => {},
});

export const NotificatorContextProvider: React.FC = ({ children }) => {
  const setContext = (context: any) => {
    setContextState({ ...contextState, ...context });
  };

  const initState = {
    show: false,
    message: "",
    type: "danger" as "danger" | "success" | "warning",
    setContext: setContext,
  };

  const [contextState, setContextState] = useState(initState);

  return (
    <NotificatorContext.Provider value={contextState}>
      {children}
    </NotificatorContext.Provider>
  );
};
