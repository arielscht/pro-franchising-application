import { StyleSheet } from "react-native";

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
    fontSize: 35,
    textAlign: "center",
  },
  welcomeText: {
    fontFamily: "poppins-bold",
    fontSize: 16,
    color: "#636363",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
    // borderColor: "red",
    // borderWidth: 2,
    // flex: 1,
  },
  formError: {
    fontFamily: "poppins-bold",
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
