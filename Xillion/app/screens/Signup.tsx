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
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};


type NavigationProp = NativeStackNavigationProp<RootStackParamList>;


export default function Signup() {
  const insets = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: 60 + insets.bottom,
          paddingTop: Platform.OS === "android" ? 80 : 100,
        },
      ]}
    >
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        It only takes a minute to create your account
      </Text>

      {/* First & Last Name */}
      <View style={styles.nameRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 6 }]}
          placeholder="First Name"
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 6 }]}
          placeholder="Last Name"
          placeholderTextColor="#999"
        />
      </View>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#999"
        keyboardType="email-address"
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

      {/* Terms and Policy */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setAgree(!agree)} style={styles.checkboxWrapper}>
          <View style={[styles.checkbox, agree && styles.checkboxChecked]}>
            {agree && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.agreeText}>
          I agree the Xillion{" "}
          <Text style={styles.linkText}>Terms of Services</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity disabled={!agree}>
        <LinearGradient
          colors={["#C525FF", "#391EDC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.signupButton,
            { opacity: agree ? 1 : 0.6 },
          ]}
        >
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.orDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Continue with Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Image 
                  source={require('../../assets/images/google-icon.png')} 
                  style={styles.googleIcon}
                />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Already Registered */}
      <View style={styles.LoginContainer}>
        <Text style={styles.LoginText}>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.LoginLink}> Log In</Text>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    color: "#949494",
    marginBottom: 30,
    textAlign: "center",
  },
  nameRow: {
    flexDirection: "row",
    marginBottom: 16,
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
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    color: "white",
    paddingVertical: 14,
  },
  eyeButton: {
    padding: 6,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  checkboxWrapper: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: "#888",
    borderWidth: 1.5,
    borderRadius: 4,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: "#D359FF",
    borderColor: "#D359FF",
  },
  agreeText: {
    color: "#949494",
    flex: 1,
    flexWrap: "wrap",
  },
  linkText: {
    color: "#D359FF",
  },
  signupButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  signupButtonText: {
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
  footerText: {
    textAlign: "center",
    color: "#949494",
  },
  
  LoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  LoginText: {
    color: "#949494",
  },
  LoginLink: {
    color: "#D359FF",
    fontWeight: "600",
  },
});
