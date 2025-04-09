import React from "react";

import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

export default function IconButton({
  name,
  onPress,
  size = 40,
  backgroundColor = colors.medium,
  iconColor = colors.white,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </TouchableOpacity>
  );
}
