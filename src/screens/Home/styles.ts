import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: "poppins-bold",
    fontSize: windowHeight * 0.03,
    color: "#FBA52F",
    marginBottom: -8,
  },
  productList: {
    paddingHorizontal: 10,
  },
});

export default styles;
