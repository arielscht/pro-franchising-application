import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalText: {
    fontFamily: "poppins-bold",
    fontSize: windowHeight * 0.024,
    textAlign: "center",
  },
  modalButtonsWrapper: {
    flexDirection: "row",
    marginTop: 30,
  },
  modalButton: {
    flex: 1,
  },
});

export default styles;
