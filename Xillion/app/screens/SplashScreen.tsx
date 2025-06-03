import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

// Define the stack param list
type RootStackParamList = {
  Login: undefined;
};

// Define the navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#0f172a", "#581c87", "#0f172a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Background Overlay */}
      <View style={styles.overlay} />

      {/* Main Content */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>XILLION</Text>
        <View style={styles.underline} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  centerContent: {
    zIndex: 10,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 4,
    textAlign: "center",
  },
  underline: {
    width: 100,
    height: 4,
    backgroundColor: "#fff",
    marginTop: 16,
    borderRadius: 2,
  },
  
});
