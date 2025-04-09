import React from "react";
import { View, StyleSheet } from "react-native";

import ChatButton from "../components/ChatButton";
import routes from "../navigation/routes";
import { useRecordingContext } from "../utils/Context";

export default function ChatButtonScreen({ navigation }) {
  const { startSession, isMuted, setIsMuted, isRecording, setIsRecording } =
    useRecordingContext();

  const handleStart = async () => {
    const success = await startSession();
    if (success) {
      navigation.navigate(routes.CHATSCREEN);
    }
  };

  return (
    <View style={styles.container}>
      <ChatButton onPress={handleStart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
