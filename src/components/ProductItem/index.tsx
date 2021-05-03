import React, { useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

import IngredientItem from "./IngredientItem";
import { Product } from "../../types/global";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const [ingredientsOpened, setIngredientsOpened] = useState(false);
  const ingredientsContainerAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();

  const toggleIngredients = () => {
    if (ingredientsOpened) {
      Animated.timing(ingredientsContainerAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setIngredientsOpened(false);
      });
    } else {
      Animated.timing(ingredientsContainerAnim, {
        toValue: product.ingredients.length * windowHeight * 0.062 + 10,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setIngredientsOpened(true);
      });
    }
  };

  const rotateIngrediensButtonArrow = ingredientsContainerAnim.interpolate({
    inputRange: [0, product.ingredients.length * windowHeight * 0.062 + 10],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.productImageFrame}>
          <Image
            source={{
              uri: product.image,
            }}
            style={styles.image}
            resizeMode="contain"
          ></Image>
        </View>
        <View style={styles.itemInfoContainer}>
          <View style={styles.editButtonWrapper}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate("EditProduct", {
                  mode: "edit",
                  product: { ...product },
                })
              }
            >
              <Feather name="edit-2" size={windowHeight * 0.03} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemNameWrapper}>
            <Text
              style={styles.itemTitle}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {product.name}
            </Text>
            <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={styles.ingredientsButton}
            onPress={toggleIngredients}
          >
            <Animated.View
              style={{ transform: [{ rotateZ: rotateIngrediensButtonArrow }] }}
            >
              <Ionicons
                name="chevron-down"
                size={windowHeight * 0.03}
                color="#707070"
              />
            </Animated.View>
            <Text style={styles.ingredientsButtonText}>Ingredientes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={{
          ...styles.ingredientsContainer,
          height: ingredientsContainerAnim,
        }}
      >
        <Animated.View
          style={{ overflow: "hidden", height: ingredientsContainerAnim }}
        >
          <View style={{ height: 10 }}></View>
          {product.ingredients.map((ingredient) => (
            <IngredientItem key={ingredient.id} ingredient={ingredient} />
          ))}
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default ProductItem;
