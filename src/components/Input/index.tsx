import React from "react";
import { TextInput, TextInputProps } from "react-native";

import styles from "./styles";

interface InputProps extends TextInputProps {
  style?: object;
}

const Input: React.FC<InputProps> = ({ children, style, ...inputProps }) => {
  return <TextInput style={{ ...styles.input, ...style }} {...inputProps} />;
};

export default Input;
