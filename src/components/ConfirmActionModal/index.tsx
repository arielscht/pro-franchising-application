import React from "react";
import { Text, View } from "react-native";

import Button from "../Button";
import Modal, { closeModal } from "../Modal";

import styles from "./styles";

interface ConfirmActionModalProps {
  onConfirm: () => void;
  onClose: () => void;
  confirmButtonText: string;
  confirmQuestion: string;
  loading: boolean;
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
  loading,
  onClose,
  onConfirm,
  confirmButtonText,
  confirmQuestion,
}) => {
  return (
    <Modal onClose={onClose}>
      <Text style={styles.modalText}>{confirmQuestion}</Text>
      <View style={styles.modalButtonsWrapper}>
        <Button
          buttonText={confirmButtonText}
          buttonStyle={{
            ...styles.modalButton,
            marginRight: 10,
            backgroundColor: "#ef5350",
          }}
          onPress={onConfirm}
          loading={loading}
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
  );
};

export default ConfirmActionModal;
