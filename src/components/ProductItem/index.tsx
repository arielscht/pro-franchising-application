import React, { useRef, useState } from "react";
import { View, Image, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

import styles from "./styles";

import IngredientItem from "./IngredientItem";

interface ProductItemProps {
  // product: {
  //   id: number;
  //   name: string;
  //   image: string;
  //   price: number;
  //   ingredients: {
  //     id: number;
  //     name: string;
  //     cost: number;
  //   }[];
  // };
}

const ProductItem: React.FC<ProductItemProps> = () => {
  const [ingredientsOpened, setIngredientsOpened] = useState(false);
  const ingredientsContainerAnim = useRef(new Animated.Value(0)).current;

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
        toValue: 3 * 45,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setIngredientsOpened(true);
      });
    }
  };

  const rotateIngrediensButtonArrow = ingredientsContainerAnim.interpolate({
    inputRange: [0, 3 * 45],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <>
      <View style={styles.container}>
        <View style={styles.productImageFrame}>
          <Image
            source={{
              uri:
                "https://mais1cafe.com.br/wp-content/uploads/2020/08/Sensacao.png",
            }}
            style={styles.image}
            resizeMode="contain"
          ></Image>
        </View>
        <View style={styles.itemInfoContainer}>
          <View style={styles.editButtonWrapper}>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemNameWrapper}>
            <Text style={styles.itemTitle}>Drink Gelado</Text>
            <Text style={styles.price}>R$ 5,00</Text>
          </View>
          <TouchableOpacity
            style={styles.ingredientsButton}
            onPress={toggleIngredients}
          >
            <Animated.View
              style={{ transform: [{ rotateZ: rotateIngrediensButtonArrow }] }}
            >
              <Ionicons name="chevron-down" size={24} color="#707070" />
            </Animated.View>
            <Text style={styles.ingredientsButtonText}>Ingredientes</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {ingredientsOpened && ( */}
      <Animated.View
        style={{
          ...styles.ingredientsContainer,
          height: ingredientsContainerAnim,
        }}
        // onLayout={(event) => {
        //   var { height } = event.nativeEvent.layout;
        //   console.log("HEIGHT: ", height);
        // }}
      >
        <IngredientItem />
        <IngredientItem />
        <IngredientItem />
      </Animated.View>
      {/*})}*/}
    </>
  );
};

export default ProductItem;
