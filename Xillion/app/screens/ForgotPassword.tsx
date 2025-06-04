import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  Login: undefined;
  Verification: { mobileNumber: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSendCode = () => {
    if (mobileNumber.length === 10) {
      navigation.navigate("Verification", { mobileNumber });
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../../assets/images/back_arrow.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Forgot Password</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>Enter your mobile number to receive a verification code</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />

        <TouchableOpacity 
          disabled={mobileNumber.length !== 10}
          onPress={handleSendCode}
        >
          <LinearGradient
            colors={["#C525FF", "#391EDC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.sendButton,
              { opacity: mobileNumber.length === 10 ? 1 : 0.6 }
            ]}
          >
            <Text style={styles.sendButtonText}>Send Code</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21083a",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 60 : 100,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 70,
    left: 20,
    padding: 10,
    backgroundColor: "#0E0422",
    borderRadius: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    borderColor: "#5e5e5e",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    color: "white",
    marginBottom: 30,
  },
  sendButton: {
    width: 200,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
