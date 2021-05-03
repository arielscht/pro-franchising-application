import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "red",
    paddingVertical: windowHeight * 0.008,
    // paddingHorizontal: 20,
    borderColor: "#000",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: windowHeight * 0.003,
  },
  mainText: {
    fontFamily: "poppins",
    fontSize: windowHeight * 0.02,
  },
});

export default styles;
