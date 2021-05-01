import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Header from "../../components/Header";
import Input from "../../components/Input";
import IngredientItemForm from "./IngredientItemForm";

import styles from "./styles";

const EditProduct = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} style={styles.backButtonIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Produto</Text>
      </Header>
      <View style={styles.contentContainer}>
        <Text style={styles.formHeaderText}>Preencha os campos abaixo</Text>
        <View style={styles.fieldDivider}>
          <Input
            placeholder="Nome"
            style={{ ...styles.input, ...styles.inputMarginRight }}
          />
          <Input placeholder="Preço" style={styles.input} />
        </View>

        <Input placeholder="URL da imagem" style={{ marginBottom: 20 }} />
        <View style={styles.ingredientsHeaderContainer}>
          <Text style={styles.formHeaderText}>Adicione os ingredientes: </Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={32} />
          </TouchableOpacity>
        </View>
        <View style={styles.ingredientsContainer}>
          <IngredientItemForm discardDisabled />
          <IngredientItemForm />
          <IngredientItemForm />
        </View>
      </View>
    </View>
  );
};

export default EditProduct;
