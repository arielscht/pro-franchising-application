import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    height: "100%",
    width: "20%",
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingLeft: 10,
    zIndex: 10,
  },
  deleteButton: {
    position: "absolute",
    height: "100%",
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 20,
    zIndex: 10,
    right: 0,
  },
  backButtonIcon: {},
  headerTitle: {
    fontFamily: "poppins-bold",
    fontSize: windowHeight * 0.03,
    color: "#FBA52F",
    marginBottom: -8,
    flex: 1,
    textAlign: "center",
    zIndex: 5,
  },
  contentContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    maxHeight: "100%",
    flex: 1,
  },
  formWrapper: {
    width: "100%",
    alignSelf: "center",
    maxWidth: 750,
    height: "100%",
  },
  formHeaderText: {
    fontFamily: "poppins",
    // fontSize: 16,
    fontSize: windowHeight * 0.021,
  },
  fieldDivider: {
    marginTop: 20,
    flexDirection: "row",
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
  modalText: {
    fontFamily: "poppins-bold",
    fontSize: 18,
    textAlign: "center",
  },
  modalButtonsWrapper: {
    flexDirection: "row",
    marginTop: 30,
  },
  modalButton: {
    flex: 1,
  },
});

export default styles;
