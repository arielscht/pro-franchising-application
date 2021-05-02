import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    // borderColor: "red",
    // borderWidth: 2,
    height: 50,
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
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
});

export default styles;
