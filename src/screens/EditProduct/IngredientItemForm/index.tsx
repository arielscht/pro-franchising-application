import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Input from "../../../components/Input";

import styles from "./styles";

interface IngredientItemFormProps {
  discardDisabled?: boolean;
}

const IngredientItemForm: React.FC<IngredientItemFormProps> = ({
  discardDisabled,
}) => {
  return (
    <View style={styles.container}>
      <Input placeholder="Qtd" style={{ flex: 1, marginRight: 10 }} />
      <Input placeholder="R$" style={{ flex: 1, marginRight: 10 }} />
      <Input placeholder="Nome" style={{ flex: 4 }} />
      <TouchableOpacity style={styles.discardButton} disabled={discardDisabled}>
        <Ionicons
          name="ios-trash-outline"
          size={24}
          color={discardDisabled ? "#ccc" : "#000"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IngredientItemForm;
