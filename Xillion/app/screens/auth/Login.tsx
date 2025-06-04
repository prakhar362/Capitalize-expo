import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 30,
          paddingTop: Platform.OS === "android" ? 80 : 100,
        },
      ]}
    >
      {/* Title and Subtitle */}
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>You have been missed</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <LinearGradient
  colors={["#C525FF", "#391EDC"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 0, y: 1 }} // top-to-bottom
  style={styles.loginButton}
>
          <Text style={styles.loginButtonText}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.orDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Google Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image 
          source={require('../../../assets/images/google-icon.png')} 
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Sign up */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupLink}> Sign Up</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    color: "#949494",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderColor: "#5e5e5e",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    color: "white",
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#5e5e5e",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    color: "white",
    paddingVertical: 14,
  },
  eyeButton: {
    padding: 6,
  },
  forgot: {
    color: "#D359FF",
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  loginButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#5e5e5e",
  },
  orText: {
    color: "#949494",
    marginHorizontal: 10,
  },
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#0e0422",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 30,
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  googleText: {
    color: "white",
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#949494",
  },
  signupLink: {
    color: "#D359FF",
    fontWeight: "600",
  },
});
