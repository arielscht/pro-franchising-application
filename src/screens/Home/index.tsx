import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserContext } from "../../context/UserContext";
import ProductItem from "../../components/ProductItem";
import Header from "../../components/Header";

import api from "../../services/api";

import { Product } from "../../types/global";

const { height: windowHeight } = Dimensions.get("window");

import styles from "./styles";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(0);

  const navigation = useNavigation();
  const route: RouteProp<
    { params: { reload?: boolean } },
    "params"
  > = useRoute();
  // const screenIsFocused = useIsFocused();

  const { setContext, token: userToken } = useContext(UserContext);

  const fetchProducts = async () => {
    if (productsLoading) return;

    if (totalProducts > 0 && products.length === totalProducts) return;

    try {
      setProductsLoading(true);
      const response = await api.get("/product/list", {
        params: { page: page },
        headers: { authorization: userToken },
      });

      setProducts([...products, ...response.data.content]);
      setTotalProducts(response.data.totalElements);
      setPage(page + 1);
    } catch (err) {
      if (err.response.data.status === 401) logoutHandler();
    }
    setProductsLoading(false);
  };

  useEffect(() => {
    if (!page) fetchProducts();
  }, [page]);

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
            size={windowHeight * 0.04}
            style={{ transform: [{ scaleX: -1 }] }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Produtos</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProduct", { mode: "add" })}
        >
          <Ionicons name="add" size={windowHeight * 0.04} />
        </TouchableOpacity>
      </Header>
      <FlatList
        style={styles.productList}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        keyExtractor={(product) => product.id.toString()}
        data={products}
        renderItem={(data) => <ProductItem product={data.item} />}
        refreshControl={
          <RefreshControl
            refreshing={productsLoading}
            onRefresh={() => {
              setTotalProducts(0);
              setProducts([]);
              setPage(0);
            }}
          />
        }
        onEndReached={fetchProducts}
        onEndReachedThreshold={0.3}
      />
    </View>
  );
};

export default Home;
