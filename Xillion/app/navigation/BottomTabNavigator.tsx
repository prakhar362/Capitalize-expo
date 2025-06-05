import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image } from 'react-native';
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
          borderTopWidth: 1,
          borderTopColor: 'white',
          elevation: 0,
          height: 60 + insets.bottom, // Adjust height for bottom safe area
          paddingBottom: insets.bottom > 0 ? insets.bottom - 5 : 5, // Add padding at bottom, slight adjustment
          paddingTop: 10,
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
          tabBarIcon: ({ color, size, focused }) => (
            <Image 
              source={focused ? require('../../assets/images/history_2-white.png') : require('../../assets/images/history_2.png')}
              style={{ width: 24, height: 24 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image 
              source={focused ? require('../../assets/images/home_2-white.png') : require('../../assets/images/home_2.png')}
              style={{ width: 28, height: 28, paddingTop: 4 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Image 
              source={focused ? require('../../assets/images/user_1-white.png') : require('../../assets/images/user_1.png')}
              style={{ width: 24, height: 24, paddingTop: 2 }}
            />
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
