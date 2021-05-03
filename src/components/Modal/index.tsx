import React, { useRef, useEffect } from "react";
import { ScrollView, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./styles";

interface ModalProps {
  onClose: () => void;
}

let closeModal: () => void;

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const modalTransformAnim = useRef(new Animated.Value(-600)).current;

  useEffect(() => {
    Animated.spring(modalTransformAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  closeModal = () => {
    console.log("CLOSE");
    Animated.spring(modalTransformAnim, {
      toValue: -800,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      onClose();
    }, 200);
  };

  return (
    <>
      <Animated.View style={styles.backdrop}>
        <Animated.View
          style={{
            ...styles.container,
            transform: [{ translateY: modalTransformAnim }],
          }}
        >
          <TouchableOpacity style={styles.backButton} onPress={closeModal}>
            <Ionicons name="arrow-back-outline" color="#636363" size={32} />
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>{children}</ScrollView>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export { closeModal };

export default Modal;
