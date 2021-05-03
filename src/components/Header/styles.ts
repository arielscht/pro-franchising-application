import { StyleSheet, StatusBar, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  headerContainer: {
    height: StatusBar.currentHeight
      ? StatusBar.currentHeight + windowHeight * 0.07
      : windowHeight * 0.07 + 20,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "#FFF",
    elevation: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    position: "relative",
  },
});

export default styles;
