import React from "react";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { StyleSheet } from "react-native";
import colors from "../config/colors";

export default function TranscriptViewScreen({ route }) {
  const { content } = route.params;

  return (
    <Screen style={styles.screen}>
      <AppText>{content}</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
