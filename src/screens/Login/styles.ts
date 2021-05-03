import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  title: {
    color: "#FBA52F",
    fontFamily: "poppins",
    fontSize: windowHeight * 0.05,
    textAlign: "center",
  },
  welcomeText: {
    fontFamily: "poppins-bold",
    // fontSize: 16,
    fontSize: windowHeight * 0.022,
    color: "#636363",
    textAlign: "center",
    marginBottom: windowHeight * 0.025,
  },
  formContainer: {
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
    // borderColor: "red",
    // borderWidth: 2,
    // flex: 1,
    maxWidth: 420,
    width: "100%",
    alignSelf: "center",
  },
  formError: {
    fontFamily: "poppins-bold",
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
