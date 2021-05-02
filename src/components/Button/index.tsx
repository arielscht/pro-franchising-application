import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from "react-native";

import styles from "./styles";

interface ButtonProps extends TouchableOpacityProps {
  buttonStyle?: object;
  textStyle?: object;
  buttonText: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  buttonStyle,
  buttonText,
  textStyle,
  loading,
  ...touchableProps
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...buttonStyle }}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <Text style={{ ...styles.buttonText, ...textStyle }}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
