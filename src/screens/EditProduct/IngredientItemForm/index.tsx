import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useFormContext } from "react-hook-form";

import Input from "../../../components/Input";

import styles from "./styles";

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

  const {
    register,
    setValue,
    trigger: triggerValidation,
    formState,
    getValues,
    unregister,
  } = useFormContext();

  useEffect(() => {
    register(`${fieldName}.name`, { required: true });
    register(`${fieldName}.quantity`, { required: true });
    register(`${fieldName}.cost`, { required: true });

    return () => {
      unregister(`${fieldName}.name`);
      unregister(`${fieldName}.quantity`);
      unregister(`${fieldName}.cost`);
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
        {/* <View style={styles.container}> */}
        <Input
          placeholder="Qtd"
          containerStyle={{ flex: 2, marginRight: 10 }}
          keyboardType="numeric"
          onChangeText={(text) => setValue(`${fieldName}.quantity`, +text)}
          onBlur={() => triggerValidation(`${fieldName}.quantity`)}
          error={checkFieldError("quantity")}
          showErrorMessage={false}
        />
        <Input
          placeholder="R$"
          containerStyle={{ flex: 2, marginRight: 10 }}
          keyboardType="decimal-pad"
          onChangeText={(text) => setValue(`${fieldName}.cost`, +text)}
          onBlur={() => triggerValidation(`${fieldName}.cost`)}
          error={checkFieldError("cost")}
          showErrorMessage={false}
        />
        <Input
          placeholder="Nome"
          containerStyle={{ flex: 5 }}
          onChangeText={(text) => setValue(`${fieldName}.name`, text)}
          onBlur={() => triggerValidation(`${fieldName}.name`)}
          error={checkFieldError("name")}
          showErrorMessage={false}
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
            size={24}
            color={
              discardDisabled ? "#ccc" : discardTouchCount > 0 ? "red" : "#000"
            }
          />
        </TouchableOpacity>
        {/* </View> */}
      </Animatable.View>
    </Animated.View>
  );
};

export default IngredientItemForm;
