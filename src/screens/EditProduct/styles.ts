import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    // borderWidth: 1,
    // borderColor: "red",
    height: "100%",
    width: "20%",
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingLeft: 10,
    zIndex: 10,
  },
  backButtonIcon: {},
  headerTitle: {
    fontFamily: "poppins-bold",
    fontSize: 24,
    color: "#FBA52F",
    marginBottom: -8,
    flex: 1,
    textAlign: "center",
    zIndex: 5,
  },
  contentContainer: {
    // margin: 10,
    backgroundColor: "#FFF",
    // borderRadius: 14,
    // elevation: 5,
    padding: 15,
    maxHeight: "100%",
    flex: 1,
  },
  formHeaderText: {
    fontFamily: "poppins",
    fontSize: 16,
  },
  fieldDivider: {
    marginTop: 20,
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 1,
    marginBottom: 30,
  },
  inputContainerStyle: {
    flex: 1,
  },
  inputMarginRight: {
    marginRight: 10,
  },
  ingredientsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  ingredientsContainer: {},
  saveButton: {
    backgroundColor: "#27AE60",
    marginHorizontal: 30,
    marginVertical: 30,
  },
});

export default styles;
