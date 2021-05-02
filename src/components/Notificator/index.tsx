import React, { useRef, useEffect, useState } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import * as Animatable from "react-native-animatable";

import styles from "./styles";

interface NotificatorProps {
  message: string;
  type: "success" | "danger" | "warning";
  onClose: () => void;
}

const Notificator: React.FC<NotificatorProps> = ({
  message,
  type,
  onClose,
}) => {
  const [notificationAnimation, setNotificationAnimation] = useState(
    "fadeInDown"
  );

  const progressBarWidth = useRef(
    new Animated.Value(Dimensions.get("window").width * 0.8)
  ).current;

  useEffect(() => {
    let closeTimeout;
    Animated.timing(progressBarWidth, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => {
      setNotificationAnimation("fadeOutUp");
      closeTimeout = setTimeout(onClose, 500);
    });
  }, []);

  let color;
  switch (type) {
    case "success":
      color = "#27AE60";
      break;
    case "warning":
      color = "#FFCA36";
      break;
    case "danger":
      color = "#ef5350";
      break;
  }

  return (
    <>
      <Animatable.View
        style={{ ...styles.container, backgroundColor: color }}
        animation={notificationAnimation}
      >
        <View style={styles.messageWrapper}>
          <Text style={styles.message}>{message}</Text>
        </View>
        <Animated.View
          style={{ ...styles.progressBar, width: progressBarWidth }}
        />
      </Animatable.View>
    </>
  );
};

export default Notificator;
