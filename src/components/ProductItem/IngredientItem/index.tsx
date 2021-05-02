import React from "react";
import { View, Text } from "react-native";

import { Ingredient } from "../../../types/global";

import styles from "./styles";

interface IngredientItemProps {
  ingredient: Ingredient;
}

const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient }) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.mainText, marginRight: 10 }}>
        {ingredient.quantity}
      </Text>
      <Text style={{ ...styles.mainText, marginRight: 20 }}>
        R${ingredient.cost.toFixed(2)}
      </Text>
      <Text style={styles.mainText}>{ingredient.name}</Text>
    </View>
  );
};

export default IngredientItem;
