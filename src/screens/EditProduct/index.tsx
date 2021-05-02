import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useForm, FormProvider } from "react-hook-form";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IngredientItemForm from "./IngredientItemForm";

import styles from "./styles";

interface Ingredient {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

export interface FormData {
  name: string;
  price: number;
  image: string;
  ingredients: Ingredient[];
}

const EditProduct = () => {
  const [ingredientsIndexes, setIngredientesIndexes] = useState([0]);
  const [ingredientCount, setIngredientCount] = useState(0);

  const navigation = useNavigation();

  const formMethods = useForm<FormData>();
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState,
    trigger: triggerValidation,
  } = formMethods;

  const addIngredient = () => {
    setIngredientesIndexes((prevState) => {
      const newIngredients = [...prevState, ingredientCount + 1];
      return newIngredients;
    });
    setIngredientCount((prevState) => prevState + 1);
  };

  const deleteIngredient = (itemId: number) => {
    setIngredientesIndexes((prevState) => {
      const newIngredients = [...prevState];
      const itemIndex = newIngredients.indexOf(itemId);
      newIngredients.splice(itemIndex, 1);
      return newIngredients;
    });
  };

  useEffect(() => {
    register("name", { required: true });
    register("price", { required: true });
    register("image", {
      required: true,
      pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    });
  }, []);

  const submitHandler = (data: FormData) => {
    console.log("DATAAAA: ", data);
  };

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
      <FormProvider {...formMethods}>
        <View style={styles.contentContainer}>
          <Text style={styles.formHeaderText}>Preencha os campos abaixo</Text>
          <View style={styles.fieldDivider}>
            <Input
              placeholder="Nome"
              style={styles.inputMarginRight}
              containerStyle={styles.inputContainerStyle}
              onChangeText={(text) => setValue("name", text)}
              onBlur={() => triggerValidation("name")}
              error={"name" in formState.errors}
              errorObj={formState.errors.name}
            />
            <Input
              placeholder="Preço"
              containerStyle={styles.inputContainerStyle}
              keyboardType="number-pad"
              onChangeText={(text) => setValue("price", +text)}
              onBlur={() => triggerValidation("price")}
              error={"price" in formState.errors}
              errorObj={formState.errors.price}
            />
          </View>

          <Input
            placeholder="URL da imagem"
            textContentType="URL"
            onChangeText={(text) => setValue("image", text)}
            onBlur={() => triggerValidation("image")}
            error={"image" in formState.errors}
            errorObj={formState.errors.image}
          />
          <View style={styles.ingredientsHeaderContainer}>
            <Text style={styles.formHeaderText}>
              Adicione os ingredientes:{" "}
            </Text>
            <TouchableOpacity onPress={addIngredient}>
              <Ionicons name="add-circle-outline" size={32} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.ingredientsContainer}>
            {ingredientsIndexes.map((item, index) => {
              const fieldName = `ingredients.${item}`;
              return (
                <IngredientItemForm
                  key={fieldName}
                  onDiscard={() => deleteIngredient(item)}
                  discardDisabled={index === 0}
                  fieldName={fieldName}
                  index={item}
                />
              );
            })}
          </ScrollView>
          <Button
            buttonText="Salvar"
            buttonStyle={styles.saveButton}
            activeOpacity={0.5}
            onPress={handleSubmit(submitHandler)}
          />
        </View>
      </FormProvider>
    </View>
  );
};

export default EditProduct;
