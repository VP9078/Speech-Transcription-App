import React from "react";
import { Text } from "react-native";

import defaultStyles from "../config/styles";

export default function AppText({ style, children, ...otherProps }) {
  return (
    <Text
      style={[defaultStyles.text, style, { fontFamily: "Poppins" }]}
      {...otherProps}
    >
      {children}
    </Text>
  );
}
