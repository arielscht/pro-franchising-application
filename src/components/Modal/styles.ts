import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("screen").width;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 20,
    backgroundColor: "rgba(0,0,0,.5)",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    overflow: "hidden",
  },
  container: {
    zIndex: 30,
    width: "90%",
    backgroundColor: "#FFF",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 1,
    position: "absolute",
  },
  backButton: {
    width: 80,
    // borderColor: "green",
    // borderWidth: 2,
    marginLeft: -20,
  },
  scrollView: {
    maxHeight: Dimensions.get("window").height * 0.8,
  },
});

export default styles;
