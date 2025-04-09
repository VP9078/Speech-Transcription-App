import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import routes from "./routes";
import ChatNavigator from "./ChatNavigator";
import TranscriptNavigator from "./TranscriptNavigator";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Record"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="microphone"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transcripts"
        component={TranscriptNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="text-box-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
