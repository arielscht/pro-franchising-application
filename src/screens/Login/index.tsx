import React, { useEffect, useState, useContext } from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

import { UserContext } from "../../context/UserContext";
import { NotificatorContext } from "../../context/NotificatorContext";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setContext: setUserContext } = useContext(UserContext);
  const { setContext: setNotificatorContext } = useContext(NotificatorContext);

  const {
    register,
    setValue,
    handleSubmit,
    formState,
    trigger: triggerValidation,
  } = useForm<FormData>();

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });

    const retrieveToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const username = await AsyncStorage.getItem("username");

      if (token && username) {
        setUserContext({ token, username, isLogged: true });
      }
    };

    retrieveToken();
  }, []);

  const loginHandler = async (data: FormData) => {
    setLoading(true);
    setHasError(false);
    try {
      const response = await api.post("/auth/login", data);

      await AsyncStorage.setItem("token", response.headers.authorization);
      await AsyncStorage.setItem("username", response.data.name);

      setUserContext({
        token: response.headers.authorization,
        username: response.data.name,
        isLogged: true,
      });

      navigation.navigate("Home");
    } catch (err) {
      if (Math.trunc(err.response.data.status / 100) == 4) {
        setHasError(true);
        setErrorMessage("Usuário ou senha incorretos.");
      } else {
        setNotificatorContext({
          show: true,
          message:
            "Ocorreu um erro inesperado. Por favor tente novamente mais tarde.",
          type: "danger",
        });
      }
    }
    setLoading(false);
  };

  const onSubmit = (data: FormData) => loginHandler(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CoffeeShop</Text>
      <Text style={styles.welcomeText}>Seja bem-vindo</Text>
      <KeyboardAvoidingView style={styles.formContainer} behavior="padding">
        <Input
          placeholder="Nome do usuário"
          onChangeText={(text) => setValue("username", text)}
          onBlur={() => triggerValidation("username")}
          error={"username" in formState.errors}
          errorObj={formState.errors.username}
        />
        <Input
          placeholder="Senha"
          style={{ marginTop: 30 }}
          secureTextEntry
          onChangeText={(text) => setValue("password", text)}
          onBlur={() => triggerValidation("password")}
          error={"password" in formState.errors}
          errorObj={formState.errors.password}
        />
        {hasError && <Text style={styles.formError}>{errorMessage}</Text>}
        <Button
          buttonText="Entrar"
          buttonStyle={{ marginTop: 30 }}
          activeOpacity={0.5}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
