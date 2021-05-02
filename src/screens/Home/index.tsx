import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../../context/UserContext";
import ProductItem from "../../components/ProductItem";
import Header from "../../components/Header";

import api from "../../services/api";

import { Product } from "../../types/global";

import styles from "./styles";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const navigation = useNavigation();

  const { setContext, token: userToken } = useContext(UserContext);

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await api.get("/product/list", {
        headers: { authorization: userToken },
      });

      setProducts(response.data.content);
    } catch (err) {
      if (err.response.data.status === 401) logoutHandler();
    }
    setProductsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProduct", { mode: "add" })}
        >
          <Ionicons name="add" size={32} />
        </TouchableOpacity>
      </Header>
      <FlatList
        style={styles.productList}
        contentContainerStyle={{ paddingBottom: 20 }}
        keyExtractor={(product) => product.id.toString()}
        data={products}
        renderItem={(data) => <ProductItem product={data.item} />}
        refreshControl={
          <RefreshControl
            refreshing={productsLoading}
            onRefresh={fetchProducts}
          />
        }
      />
    </View>
  );
};

export default Home;
