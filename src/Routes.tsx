import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Login";
import Home from "./screens/Home";
import EditProduct from "./screens/EditProduct";

import { UserContext } from "./context/UserContext";
import { NotificatorContext } from "./context/NotificatorContext";
import Notificator from "./components/Notificator";

const Stack = createStackNavigator();

const Routes = () => {
  const { isLogged } = useContext(UserContext);
  const {
    show: showNotification,
    message: notificationMessage,
    type: notificationType,
    setContext: setNotificationContext,
  } = useContext(NotificatorContext);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {!isLogged ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="EditProduct" component={EditProduct} />
          </>
        )}
      </Stack.Navigator>
      {showNotification && (
        <Notificator
          message={notificationMessage}
          type={notificationType}
          onClose={() =>
            setNotificationContext({
              show: false,
              message: "",
              type: "danger",
            })
          }
        />
      )}
    </NavigationContainer>
  );
};

export default Routes;
