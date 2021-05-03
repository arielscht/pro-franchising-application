import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "80%",
    maxWidth: 500,
    alignSelf: "center",
    // left: (screenWidth * 0.2) / 2,
    paddingTop: 10,
    borderRadius: 8,
    top: 40,
    backgroundColor: "#ef5350",
    // backgroundColor: "#27AE60",
    // backgroundColor: "#FFCA36",
    elevation: 10,
    overflow: "hidden",
  },
  messageWrapper: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    fontFamily: "poppins-bold",
    textAlign: "center",
    color: "#FFF",
    flex: 1,
  },
  progressBar: {
    height: 5,
    backgroundColor: "#FFF",
    marginTop: 10,
    opacity: 0.8,
  },
});

export default styles;
