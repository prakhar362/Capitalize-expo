import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../screens/home/HomeScreen';
import Profile from '../screens/home/Profile';
import History from '../screens/home/History';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0E0422", // Dark background matching your recent change
          borderTopWidth: 0,
          elevation: 0,
          height: 60 + insets.bottom, // Adjust height for bottom safe area
          paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 5, // Add padding at bottom, slight adjustment
          paddingTop: 5,
          position: 'absolute', // Positioning to control placement
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20, // Rounded corners
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          overflow: 'hidden', // Ensure rounded corners are visible
        },
        tabBarActiveTintColor: '#C525FF', // Active color from your previous attempt
        tabBarInactiveTintColor: '#666', // Inactive color from your previous attempt
        tabBarShowLabel: false, // Hide text labels as per image
      }}
    >
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile" // Using Profile
        component={Profile} // Linking to Profile 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  // Keep existing styles or add new ones if needed
});

export default BottomTabNavigator;
