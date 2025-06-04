import React from "react";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

export default function Index() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#21083a"
        translucent
      />
      <AppNavigator />
    </>
  );
}
