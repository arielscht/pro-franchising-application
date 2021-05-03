import { StyleSheet, Dimensions, PixelRatio } from "react-native";

const { height: windowHeight, width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.28,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#FFF",
    marginHorizontal: 5,
    padding: 10,
    flexDirection: "row",
    maxWidth: 800,
    width: "98%",
    alignSelf: "center",
  },
  productImageFrame: {
    width: "50%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  itemInfoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  editButtonWrapper: {
    width: "100%",
    alignItems: "flex-end",
  },
  editButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  itemNameWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  itemTitle: {
    fontFamily: "poppins-bold",
    fontSize: windowHeight * 0.03,
    textAlign: "center",
    paddingHorizontal: 5,
  },
  price: {
    fontFamily: "poppins",
    fontSize: windowHeight * 0.035,
  },
  ingredientsButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ingredientsButtonText: {
    fontFamily: "poppins",
    fontSize: windowHeight * 0.022,
    color: "#707070",
  },
  ingredientsContainer: {
    backgroundColor: "#dbdbdb",
    marginHorizontal: 20,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    maxWidth: 780,
    width: "95%",
    alignSelf: "center",
  },
});

export default styles;
