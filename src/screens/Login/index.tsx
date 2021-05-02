import React, { useEffect, useState, useContext } from "react";
import { View, Text } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./styles";

import { UserContext } from "../../context/UserContext";

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
      setHasError(true);
      if (Math.trunc(err.response.data.status / 100) == 4) {
        setErrorMessage("Usuário ou senha incorretos.");
      } else {
        setErrorMessage(
          "Erro inesperado, por favor tente novamente mais tarde."
        );
      }
    }
    setLoading(false);
  };

  const onSubmit = (data: FormData) => loginHandler(data);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProductsManager</Text>
      <Text style={styles.welcomeText}>Seja bem-vindo</Text>
      <View style={styles.formContainer}>
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
      </View>
    </View>
  );
};

export default Login;
