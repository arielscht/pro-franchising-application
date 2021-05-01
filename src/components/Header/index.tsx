import React from "react";
import { View } from "react-native";

import styles from "./styles";

const Header: React.FC = ({ children }) => {
  return <View style={styles.headerContainer}>{children}</View>;
};

export default Header;
