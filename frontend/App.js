import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./app/navigation/AppNavigator";
import { RecordingProvider } from "./app/utils/Context";

export default function App() {
  return (
    <RecordingProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </RecordingProvider>
  );
}
