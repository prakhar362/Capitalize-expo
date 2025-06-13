import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import api from "../../config/api";

type RouteParams = {
  newPassword?: string; // Optional new password from NewPassword screen
};

type RootStackParamList = {
  Login: undefined;
  Verification: { mobileNumber: string; flowType: 'forgotPassword'; newPassword: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ForgotPassword() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { newPassword } = route.params as RouteParams;
  
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (mobileNumber.length !== 10) {
      Alert.alert("Invalid Mobile Number", "Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!newPassword) {
      Alert.alert("Error", "New password not provided. Please go back and set a new password.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/forgot-password/send-otp?mobile_number=${mobileNumber}`);
      console.log('OTP sent for forgot password:', response.data);
      
      Alert.alert('Success', 'OTP sent to your mobile number.');
      navigation.navigate("Verification", { mobileNumber, flowType: 'forgotPassword', newPassword });
    } catch (error: any) {
      console.error('Error sending OTP for forgot password:', error);
      if (error.response) {
        Alert.alert('Error', error.response.data.message || 'Failed to send OTP. Please try again.');
      } else if (error.request) {
        Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
      } else {
        Alert.alert('Error', error.message || 'An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require('../../../assets/images/back_arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Forgot Password</Text>
          <Text style={styles.text}>Enter your mobile number to receive a verification code</Text>
        </View>
      </View>
      
      <View style={styles.content}>
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
          disabled={mobileNumber.length !== 10 || isLoading}
          onPress={handleSendCode}
        >
          <LinearGradient
            colors={["#C525FF", "#391EDC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[
              styles.sendButton,
              { opacity: (mobileNumber.length === 10 && !isLoading) ? 1 : 0.6 }
            ]}
          >
            <Text style={styles.sendButtonText}>
              {isLoading ? 'Sending...' : 'Send Code'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201731",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 60 : 100,
  },
  headerContainer: {
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 0 : 0,
    left: 0,
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
  titleContainer: {
    marginTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginBottom: 12,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: "#ccc",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 20,
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
