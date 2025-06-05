import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import ForgotPasword from "../screens/auth/ForgotPassword";
import Verification from "../screens/auth/Verification";
import NewPassword from "../screens/auth/NewPassword";
import BottomTabNavigator from './BottomTabNavigator';
import OrderConfirm from "../screens/home/OrderConfirm";
import OrderSucess from "../screens/home/OrderSucess";
import ChatAI from "../screens/home/ChatAI";

// ✅ CREATE STACK
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Auth Screens */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="NewPassword" component={NewPassword} />

      {/* Main App Screens */}
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
      <Stack.Screen name="OrderSuccess" component={OrderSucess} />
      <Stack.Screen name="ChatAI" component={ChatAI} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default AppNavigator;
