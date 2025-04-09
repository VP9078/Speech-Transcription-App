import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChatScreen from "../screens/ChatScreen";
import ChatButtonScreen from "../screens/ChatButtonScreen";
import routes from "./routes";

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={routes.CHATBUTTONSCREEN}
        component={ChatButtonScreen}
      />
      <Stack.Screen name={routes.CHATSCREEN} component={ChatScreen} />
    </Stack.Navigator>
  );
}
