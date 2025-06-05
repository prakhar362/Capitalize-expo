import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import ForgotPasword from "../screens/auth/ForgotPassword";
import Verification from "../screens/auth/Verification";
import NewPassword from "../screens/auth/NewPassword";
import HomeScreen from "../screens/home/HomeScreen";
import Profile from "../screens/home/Profile";
import OrderConfirm from "../screens/home/OrderConfirm";
import OrderSucess from "../screens/home/OrderSucess";
import History from "../screens/home/History";
import ChatAI from "../screens/ChatAI";

// ✅ CREATE STACK
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Reduced to 3 seconds for better UX
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false, // Hide header for all screens
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasword} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="OrderConfirm" component={OrderConfirm} />
      <Stack.Screen name="OrderSuccess" component={OrderSucess} />
      <Stack.Screen name="History" component={History} />
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
