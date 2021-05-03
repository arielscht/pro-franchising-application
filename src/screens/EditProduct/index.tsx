import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useForm, FormProvider, Controller } from "react-hook-form";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IngredientItemForm from "./IngredientItemForm";
import Modal, { closeModal } from "../../components/Modal";

import api from "../../services/api";
import { UserContext } from "../../context/UserContext";
import { NotificatorContext } from "../../context/NotificatorContext";
import { Ingredient, Product } from "../../types/global";

import styles from "./styles";

const { height: windowHeight } = Dimensions.get("window");

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
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const { token: userToken } = useContext(UserContext);
  const { setContext: setNotificatorContext } = useContext(NotificatorContext);

  const route: RouteProp<
    { params: { mode: "add" | "edit"; product?: Product } },
    "params"
  > = useRoute();

  const navigation = useNavigation();

  const formMethods = useForm();
  const {
    handleSubmit,
    formState,
    control,
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
  }, []);

  const submitHandler = async (data: FormData) => {
    const ingredients = data.ingredients.filter((ingredient) => ingredient);
    const submitData = { ...data, ingredients };
    try {
      let response;
      setSubmitLoading(true);
      response = await api.post("/product/save", submitData, {
        headers: { authorization: userToken },
      });

      let successMessage;
      if (route.params.mode === "edit")
        successMessage = "Produto atualizado com sucesso.";
      else {
        successMessage = "Produto salvo com sucesso.";
      }
      setNotificatorContext({
        show: true,
        message: successMessage,
        type: "success",
      });
      navigation.navigate("Home", { reload: true });
    } catch (err) {
      console.log(err.response.data);
      setNotificatorContext({
        show: true,
        message:
          "Ocorreu um erro inesperado. Por favor tente novamente mais tarde.",
        type: "danger",
      });
    }
    setSubmitLoading(false);
  };

  const deleteHandler = async (product: Product) => {
    setLoadingDelete(true);
    try {
      await api.delete(`/product/delete/${product.id}`, {
        headers: {
          authorization: userToken,
        },
      });
      setNotificatorContext({
        show: true,
        message: "Produto excluído com sucesso.",
        type: "success",
      });
      closeModal();
      navigation.navigate("Home", { reload: true });
    } catch (err) {
      console.log("ERROR: ", err.response.data);
      setNotificatorContext({
        show: true,
        message:
          "Ocorreu um erro inesperado. Por favor tente novamente mais tarde.",
        type: "danger",
      });
    }
    setLoadingDelete(false);
  };

  return (
    <View style={styles.container}>
      {deleteModalOpened && route.params.mode === "edit" && (
        <Modal
          onClose={() => {
            setDeleteModalOpened(false);
          }}
        >
          <Text style={styles.modalText}>
            Tem certeza que deseja excluir este produto?
          </Text>
          <View style={styles.modalButtonsWrapper}>
            <Button
              buttonText="Excluir"
              buttonStyle={{
                ...styles.modalButton,
                marginRight: 10,
                backgroundColor: "#ef5350",
              }}
              onPress={() => {
                deleteHandler(route.params.product!);
              }}
              loading={loadingDelete}
            />
            <Button
              buttonText="Cancelar"
              buttonStyle={{
                ...styles.modalButton,
                backgroundColor: "#636363",
              }}
              onPress={() => {
                closeModal();
              }}
            />
          </View>
        </Modal>
      )}
      <Header>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Home", { reload: undefined })}
        >
          <Ionicons
            name="arrow-back"
            size={windowHeight * 0.04}
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {route.params.mode === "edit" ? "Editar Produto" : "Novo Produto"}
        </Text>
        {route.params.mode === "edit" && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setDeleteModalOpened(true)}
          >
            <Ionicons
              name="ios-trash-outline"
              size={windowHeight * 0.04}
              style={styles.backButtonIcon}
            />
          </TouchableOpacity>
        )}
      </Header>
      <FormProvider {...formMethods}>
        <View style={styles.contentContainer}>
          <View style={styles.formWrapper}>
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
                <Ionicons
                  name="add-circle-outline"
                  size={windowHeight * 0.04}
                />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.ingredientsContainer}>
              {ingredientsIndexes.map((item, index) => {
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
        </View>
      </FormProvider>
    </View>
  );
};

export default EditProduct;
