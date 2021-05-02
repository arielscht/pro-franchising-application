import React, { useContext } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../../context/UserContext";
import ProductItem from "../../components/ProductItem";
import Header from "../../components/Header";

import styles from "./styles";

const Home = () => {
  const navigation = useNavigation();

  const { setContext } = useContext(UserContext);

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("username");
    setContext({ token: "", username: "", isLogged: false });
    setTimeout(() => {
      navigation.navigate("Login");
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Header>
        <TouchableOpacity onPress={logoutHandler}>
          <Ionicons
            name="log-out-outline"
            size={32}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Produtos</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProduct")}>
          <Ionicons name="add" size={32} />
        </TouchableOpacity>
      </Header>
      <ScrollView
        style={styles.productList}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </ScrollView>
    </View>
  );
};

export default Home;
