import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useFormContext, Controller } from "react-hook-form";
import { useRoute, RouteProp } from "@react-navigation/native";

import { Product } from "../../../types/global";
import Input from "../../../components/Input";

import styles from "./styles";

const { height: windowHeight } = Dimensions.get("window");

interface IngredientItemFormProps {
  discardDisabled?: boolean;
  onDiscard: () => void;
  fieldName: string;
  index: number;
}

const IngredientItemForm: React.FC<IngredientItemFormProps> = ({
  discardDisabled,
  onDiscard,
  fieldName,
  index,
}) => {
  const [discardAnimation, setDiscardAnimation] = useState("fadeInLeft");
  const [discardTouchCount, setDiscardTouchCount] = useState(0);
  const discardTimer = useRef<NodeJS.Timeout>();
  const viewHeightAnim = useRef(new Animated.Value(100)).current;

  const route: RouteProp<
    { params: { mode: "add" | "edit"; product?: Product } },
    "params"
  > = useRoute();

  const isEditMode = route.params.mode === "edit";
  const { product } = route.params;

  const {
    trigger: triggerValidation,
    formState,
    unregister,
    control,
  } = useFormContext();

  useEffect(() => {
    return () => {
      unregister(`${fieldName}.name`);
      unregister(`${fieldName}.quantity`);
      unregister(`${fieldName}.cost`);
      unregister(`${fieldName}.id`);
    };
  }, []);

  const handleDiscard = () => {
    if (discardTouchCount == 0) {
      setDiscardTouchCount(1);
      discardTimer.current = setTimeout(() => {
        setDiscardTouchCount(0);
      }, 2000);
    } else {
      setDiscardAnimation("fadeOutLeft");
      clearTimeout(discardTimer.current!);
      setTimeout(() => {
        Animated.timing(viewHeightAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(onDiscard);
      }, 500);
    }
  };

  const checkFieldError = (field: "quantity" | "cost" | "name") => {
    if ("ingredients" in formState.errors) {
      if (formState.errors.ingredients[index] !== undefined)
        if (field in formState.errors.ingredients[index]) return true;
    }
    return false;
  };

  return (
    <Animated.View style={{ maxHeight: viewHeightAnim }}>
      <Animatable.View
        style={styles.container}
        animation={discardAnimation}
        duration={500}
      >
        <Controller
          control={control}
          name={`${fieldName}.id`}
          defaultValue={
            isEditMode
              ? product!.ingredients[index]
                ? product!.ingredients[index].id.toString()
                : ""
              : ""
          }
          render={() => <></>}
        />
        <Controller
          control={control}
          name={`${fieldName}.quantity`}
          defaultValue={
            isEditMode
              ? product!.ingredients[index]
                ? product!.ingredients[index].quantity.toString()
                : ""
              : ""
          }
          rules={{
            required: true,
            validate: (value) => {
              if (typeof +value === "number" && value > 0) return true;
              return false;
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Qtd"
              containerStyle={{ flex: 2, marginRight: 10 }}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => onChange(text)}
              onBlur={() => triggerValidation(`${fieldName}.quantity`)}
              error={checkFieldError("quantity")}
              showErrorMessage={false}
            />
          )}
        />
        <Controller
          control={control}
          name={`${fieldName}.cost`}
          defaultValue={
            isEditMode
              ? product!.ingredients[index]
                ? product!.ingredients[index].cost.toString()
                : ""
              : ""
          }
          rules={{
            required: true,
            validate: (value) => {
              if (typeof +value === "number" && value > 0) return true;
              return false;
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="R$"
              containerStyle={{ flex: 2, marginRight: 10 }}
              keyboardType="decimal-pad"
              value={value}
              onChangeText={(text) => onChange(text)}
              onBlur={() => triggerValidation(`${fieldName}.cost`)}
              error={checkFieldError("cost")}
              showErrorMessage={false}
            />
          )}
        />
        <Controller
          control={control}
          name={`${fieldName}.name`}
          defaultValue={
            isEditMode
              ? product!.ingredients[index]
                ? product!.ingredients[index].name
                : ""
              : ""
          }
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Nome"
              containerStyle={{ flex: 5 }}
              value={value}
              onChangeText={(text) => onChange(text)}
              onBlur={() => triggerValidation(`${fieldName}.name`)}
              error={checkFieldError("name")}
              showErrorMessage={false}
            />
          )}
        />
        <TouchableOpacity
          style={styles.discardButton}
          onPress={handleDiscard}
          disabled={discardDisabled}
        >
          <Ionicons
            name={
              discardTouchCount == 1
                ? "alert-circle-outline"
                : "ios-trash-outline"
            }
            size={windowHeight * 0.031}
            color={
              discardDisabled ? "#ccc" : discardTouchCount > 0 ? "red" : "#000"
            }
          />
        </TouchableOpacity>
      </Animatable.View>
    </Animated.View>
  );
};

export default IngredientItemForm;
