import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  RouteProp,
  TabRouter,
} from "@react-navigation/native";
import { useForm, FormProvider, Controller } from "react-hook-form";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IngredientItemForm from "./IngredientItemForm";

import api from "../../services/api";
import { UserContext } from "../../context/UserContext";
import { NotificatorContext } from "../../context/NotificatorContext";
import { Ingredient, Product } from "../../types/global";

import styles from "./styles";

export interface FormData {
  name: string;
  price: number;
  image: string;
  ingredients: Ingredient[];
}

const EditProduct = () => {
  const [ingredientsIndexes, setIngredientesIndexes] = useState([0]);
  const [ingredientCount, setIngredientCount] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { token: userToken } = useContext(UserContext);
  const { setContext: setNotificatorContext } = useContext(NotificatorContext);

  const route: RouteProp<
    { params: { mode: "add" | "edit"; product?: Product } },
    "params"
  > = useRoute();

  const navigation = useNavigation();

  const formMethods = useForm();
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState,
    unregister,
    reset,
    control,
    trigger: triggerValidation,
  } = formMethods;

  const addIngredient = () => {
    setIngredientesIndexes((prevState) => {
      const newIngredients = [...prevState, ingredientCount + 1];
      return newIngredients;
    });
    setIngredientCount((prevState) => prevState + 1);
    console.log("INGREDIENTS COUNT: ", ingredientCount + 1);
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
    // register("name", { required: true });
    // register("price", { required: true, validate: (value) => value > 0 });
    // register("image", {
    //   required: true,
    //   pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    // });
    // register("ingredients", { required: true });
    if (route.params.mode === "edit") {
      const product = route.params.product!;
      let counter = 0;
      const newIngredientsIndexes = [];
      for (let ingredient of product.ingredients) {
        newIngredientsIndexes.push(counter);
        counter++;
      }
      setIngredientesIndexes(newIngredientsIndexes);
      setIngredientCount(product.ingredients.length - 1);
    }
    // return () => {
    //   unregister("name");
    //   unregister("price");
    //   unregister("image");
    // };
  }, []);

  const submitHandler = async (data: FormData) => {
    // console.log("DATAAAA: ", data);
    const ingredients = data.ingredients.filter((ingredient) => ingredient);
    const submitData = { ...data, ingredients };
    console.log("SUBMIT DATA: ", submitData);
    // return;
    try {
      let response;
      // if (route.params.mode === "add") {
      setSubmitLoading(true);
      response = await api.post("/product/save", submitData, {
        headers: { authorization: userToken },
      });
      // }
      console.log("RESPONSEEEE: ", response);
      let successMessage;
      if (route.params.mode === "edit")
        successMessage = "Produto atualizado com sucesso";
      else {
        successMessage = "Produto salvo com sucesso.";
      }
      setNotificatorContext({
        show: true,
        message: successMessage,
        type: "success",
      });
      navigation.navigate("Home");
    } catch (err) {
      setNotificatorContext({
        show: true,
        message:
          "Ocorreu um erro inesperado. Por favor tente novamente mais tarde.",
        type: "danger",
      });
    }
    setSubmitLoading(false);
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
        <Text style={styles.headerTitle}>
          {route.params.mode === "edit" ? "Editar Produto" : "Novo Produto"}
        </Text>
      </Header>
      <FormProvider {...formMethods}>
        <View style={styles.contentContainer}>
          <Text style={styles.formHeaderText}>Preencha os campos abaixo</Text>
          <View style={styles.fieldDivider}>
            <Controller
              control={control}
              name="id"
              defaultValue={
                route.params.mode === "edit" ? route.params.product!.id : ""
              }
              render={() => <></>}
            />
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              defaultValue={
                route.params.mode === "edit" ? route.params.product!.name : ""
              }
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  style={styles.inputMarginRight}
                  containerStyle={styles.inputContainerStyle}
                  value={value}
                  onChangeText={(text) => onChange(text)}
                  onBlur={() => triggerValidation("name")}
                  error={"name" in formState.errors}
                  errorObj={formState.errors.name}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{ required: true, validate: (value) => value > 0 }}
              defaultValue={
                route.params.mode === "edit"
                  ? route.params.product!.price.toString()
                  : ""
              }
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Preço"
                  containerStyle={styles.inputContainerStyle}
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={(text) => {
                    console.log("PRICE: ", getValues("price"));
                    onChange(+text);
                  }}
                  onBlur={() => triggerValidation("price")}
                  error={"price" in formState.errors}
                  errorObj={formState.errors.price}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="image"
            rules={{
              required: true,
              pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            }}
            defaultValue={
              route.params.mode === "edit" ? route.params.product!.image : ""
            }
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="URL da imagem"
                textContentType="URL"
                value={value}
                onChangeText={(text) => onChange(text)}
                onBlur={() => triggerValidation("image")}
                error={"image" in formState.errors}
                errorObj={formState.errors.image}
              />
            )}
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
              console.log("ITEM: ", item);
              const fieldName = `ingredients.${item}`;
              return (
                <IngredientItemForm
                  key={fieldName}
                  onDiscard={() => deleteIngredient(item)}
                  discardDisabled={
                    (route.params.mode !== "edit" || index === 0) &&
                    ingredientsIndexes.length === 1
                  }
                  fieldName={fieldName}
                  index={item}
                />
              );
            })}
          </ScrollView>
          <Button
            buttonText="Salvar"
            buttonStyle={styles.saveButton}
            loading={submitLoading}
            activeOpacity={0.5}
            onPress={handleSubmit(submitHandler)}
          />
        </View>
      </FormProvider>
    </View>
  );
};

export default EditProduct;
