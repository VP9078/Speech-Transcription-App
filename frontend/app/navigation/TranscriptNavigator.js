import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TranscriptFeedScreen from "../screens/TranscriptFeedScreen";
import TranscriptViewScreen from "../screens/TranscriptViewScreen";

const Stack = createNativeStackNavigator();

export default function TranscriptNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TranscriptFeed"
        component={TranscriptFeedScreen}
        options={{
          title: "Transcripts",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TranscriptView"
        component={TranscriptViewScreen}
        options={({ route }) => ({
          title: route.params.created_at,
          headerBackButtonDisplayMode: "minimal",
        })}
      />
    </Stack.Navigator>
  );
}
