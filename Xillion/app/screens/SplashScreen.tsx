import React, { useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Simulate splash screen delay
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Welcome to Xillion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});