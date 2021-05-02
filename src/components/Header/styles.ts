import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    height: StatusBar.currentHeight ? StatusBar.currentHeight + 60 : 100,
    // borderColor: "red",
    // borderWidth: 2,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
    alignItems: "flex-end",
    // borderBottomColor: "#636363",
    // borderBottomWidth: 1,
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
