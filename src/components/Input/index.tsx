import React, { useRef } from "react";
import { TextInput, TextInputProps, Text, Animated, View } from "react-native";
import { FieldError } from "react-hook-form";

import styles from "./styles";

interface InputProps extends TextInputProps {
  style?: object;
  containerStyle?: object;
  error: boolean;
  errorObj?: FieldError;
  minLength?: number;
  maxLength?: number;
  showErrorMessage?: boolean;
}

const Input: React.FC<InputProps> = ({
  children,
  style,
  containerStyle,
  error,
  errorObj,
  minLength,
  maxLength,
  showErrorMessage,
  ...inputProps
}) => {
  const errorAnim = useRef(new Animated.Value(0)).current;

  let errorMessage;
  switch (errorObj?.type) {
    case "minLength":
      errorMessage = `Mínimo de ${minLength} caracteres`;
      break;
    case "maxLength":
      errorMessage = `Máximo de ${maxLength} caracteres`;
      break;
    case "required":
      errorMessage = "Campo obrigatório";
      break;
    case "pattern":
      if (inputProps.textContentType === "URL")
        errorMessage = "Insira uma URL válida";
      else errorMessage = "Formato inválido";
      break;
    case "validate":
      errorMessage = "Campo obrigatório";
      break;
    default:
      errorMessage = "Campo inválido";
  }

  return (
    <View style={containerStyle}>
      <TextInput
        style={{
          ...styles.input,
          ...style,
          borderColor: error ? "red" : "#000",
        }}
        {...inputProps}
      />
      {showErrorMessage !== false ? (
        error ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null
      ) : null}
    </View>
  );
};

export default Input;
