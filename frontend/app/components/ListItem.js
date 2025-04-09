import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import React from "react";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import AppText from "./AppText";
import colors from "../config/colors";

export default function ListItem({
  image,
  title,
  subTitle,
  onPress,
  IconComponent,
  renderRightActions,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}
            <View style={styles.textBox}>
              <AppText style={styles.title} numberOfLines={1}>
                {title}
              </AppText>
              {subTitle && (
                <AppText style={styles.subTitle} numberOfLines={2}>
                  {subTitle}
                </AppText>
              )}
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    flex: 0.25,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: "50%",
  },
  textBox: {
    flex: 1,
    justifyContent: "center",
    margin: 5,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 15,
    color: colors.dark,
  },
});
