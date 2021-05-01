import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const IngredientItem = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.mainText, marginRight: 10 }}>5x</Text>
      <Text style={{ ...styles.mainText, marginRight: 20 }}>R$2,00</Text>
      <Text style={styles.mainText}>Chantili</Text>
    </View>
  );
};

export default IngredientItem;
