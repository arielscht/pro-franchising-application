import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    borderColor: "#636363",
    borderWidth: 1,
    borderRadius: 4,
    height: windowHeight * 0.06,
    paddingHorizontal: 10,
    fontSize: windowHeight * 0.02,
  },
  errorMessage: {
    fontFamily: "poppins",
    fontSize: windowHeight * 0.018,
    color: "red",
    marginTop: 4,
  },
});

export default styles;
