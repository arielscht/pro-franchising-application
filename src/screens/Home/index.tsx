import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import ProductItem from "../../components/ProductItem";
import Header from "../../components/Header";

import styles from "./styles";

const Home = () => {
  const navigation = useNavigation();
  const logoutHandler = () => {
    navigation.goBack();
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
