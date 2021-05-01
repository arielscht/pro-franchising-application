import React from "react";
import { View, Text } from "react-native";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

const Login = () => {
  const navigation = useNavigation();

  const loginHandler = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProductsManager</Text>
      <Text style={styles.welcomeText}>Seja bem-vindo</Text>
      <View style={styles.formContainer}>
        <Input placeholder="Nome do usuário" />
        <Input placeholder="Senha" style={{ marginTop: 30 }} />
        <Button
          buttonText="Entrar"
          buttonStyle={{ marginTop: 30 }}
          activeOpacity={0.5}
          onPress={loginHandler}
        />
      </View>
    </View>
  );
};

export default Login;
