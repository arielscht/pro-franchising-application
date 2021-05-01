import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.28,
    elevation: 5,
    // borderColor: "red",
    // borderWidth: 2,
    marginTop: 20,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    padding: 10,
    flexDirection: "row",
  },
  productImageFrame: {
    width: "50%",
    // borderColor: "green",
    // borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    // borderColor: "blue",
    // borderWidth: 1,
  },
  itemInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButtonWrapper: {
    // borderColor: "red",
    // borderWidth: 2,
    width: "100%",
    alignItems: "flex-end",
  },
  editButton: {
    // borderColor: "red",
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  itemNameWrapper: {
    // borderColor: "green",
    // borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  itemTitle: {
    fontFamily: "poppins-bold",
    fontSize: 24,
  },
  price: {
    fontFamily: "poppins-bold",
    fontSize: 32,
  },
  ingredientsButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientsButtonText: {
    fontFamily: "poppins",
    fontSize: 16,
    color: "#707070",
  },
  ingredientsContainer: {
    // height: 200,

    backgroundColor: "#dbdbdb",
    marginHorizontal: 20,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    overflow: "hidden",
    elevation: 2,
  },
});

export default styles;
