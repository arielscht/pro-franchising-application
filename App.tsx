import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Routes from "./src/Routes";
import { UserContextProvider } from "./src/context/UserContext";

const fetchFonts = () => {
  return Font.loadAsync({
    poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
    "poppins-bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => {}}
      />
    );

  return (
    <>
      <StatusBar style="dark" />
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  );
}
