import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import IconButton from "../components/IconButton";
import routes from "../navigation/routes";
import { useRecordingContext } from "../utils/Context";

export default function ChatScreen({ navigation }) {
  const {
    endSession,
    toggleMute,
    isMuted,
    setIsMuted,
    isRecording,
    setIsRecording,
  } = useRecordingContext();

  const handleEnd = async () => {
    const success = await endSession();
    if (success) {
      navigation.navigate(routes.CHATBUTTONSCREEN);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, isRecording && styles.activeDot]} />
          <Text style={styles.statusText}>Active Session</Text>
        </View>
      </View>

      {/* Bottom Gradient + Button Row */}
      <LinearGradient
        colors={["#ffffff", "rgba(0, 60, 100, 0.1)"]}
        style={styles.bottomGradient}
      >
        <View style={styles.callControls}>
          <View style={styles.buttonWithLabel}>
            <IconButton
              name={isMuted ? "microphone-off" : "microphone"}
              size={60}
              backgroundColor={isMuted ? "rgba(255,59,48,0.8)" : "#3c3c3c"}
              onPress={toggleMute}
            />
          </View>
          <View style={styles.buttonWithLabel}>
            <IconButton
              name="close"
              size={60}
              backgroundColor="#ff0000"
              onPress={handleEnd}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "flex-end",
  },
  header: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 20,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginRight: 8,
  },
  activeDot: {
    backgroundColor: "#4CD964",
  },
  statusText: {
    color: "#3c3c3c",
    fontSize: 15,
    fontWeight: "500",
  },
  bottomGradient: {
    height: 180,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  callControls: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginBottom: 30,
  },
  buttonWithLabel: {
    alignItems: "center",
    justifyContent: "center",
  },
});
