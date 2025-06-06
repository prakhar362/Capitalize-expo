import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ImageSourcePropType,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from '../../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function OrderSuccess() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
       {/* Back Button */}
        <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("BottomTabs", { screen: "HomeScreen" })}
              >
                <Image 
                  source={require('../../../assets/images/back_arrow.png')}
                  style={styles.backIcon}
                />
            </TouchableOpacity>

      {/* Image */}
      <Image
        source={require("../../../assets/images/order-success.png")}
        style={styles.successImage}
        resizeMode="contain"
      />

      {/* Title + Subtitle */}
      <Text style={styles.title}>Orders Submitted Successfully!</Text>
      <Text style={styles.subtitle}>
        Please confirm order placement on your broker!
      </Text>

      {/* Done Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("BottomTabs", { screen: "HomeScreen" })}
        activeOpacity={0.8}
        style={styles.buttonWrapper}
      >
        <LinearGradient
          colors={["#8E2DE2", "#4A00E0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Done</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201731",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 60,
    left: 20,
    padding: 10,
    backgroundColor: "#0E0422",
    borderRadius: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  successImage: {
    width: '100%',
    height: 300,
    marginTop: 120,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 40,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 10,
    textAlign: "center",
  },
  buttonWrapper: {
    marginTop: 40,
    width: "100%",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
