import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ChatButton({ onPress }) {
  // Animation references
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Button press animation
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  // Combined animations
  const animatedScale = Animated.multiply(pulseAnim, scaleAnim);

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        { transform: [{ scale: animatedScale }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.button}
      >
        <LinearGradient
          colors={["#5e72e4", "#825ee4"]}
          style={styles.buttonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          borderRadius={75}
        >
          <Ionicons name="chatbubbles-outline" size={40} color="#ffffff" />
          <Text style={styles.buttonText}>Record</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 125,
    overflow: "hidden",
  },
  buttonGradient: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "600",
    marginTop: 8,
  },
});
