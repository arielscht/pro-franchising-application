import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import styles from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  buttonStyle?: object;
  textStyle?: object;
  buttonText: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  buttonStyle,
  buttonText,
  textStyle,
  ...touchableProps
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...buttonStyle }}
      {...touchableProps}
    >
      <Text style={{ ...styles.buttonText, ...textStyle }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
