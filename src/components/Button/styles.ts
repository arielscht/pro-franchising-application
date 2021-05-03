import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  button: {
    // borderColor: "red",
    // borderWidth: 2,
    height: windowHeight * 0.065,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 4,
    backgroundColor: "#FBA52F",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  buttonText: {
    fontFamily: "poppins",
    // fontSize: 18,
    fontSize: windowHeight * 0.024,
    textAlign: "center",
    color: "white",
  },
});

export default styles;
