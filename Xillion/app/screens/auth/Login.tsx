import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from '../../navigation/types';
import api from "../../config/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await api.post('/login', {
        username,
        password,
      });

      console.log('Login successful:', response.data);

      // Store access token in AsyncStorage
      const { access_token, token_type } = response.data;
      if (access_token && token_type) {
        await AsyncStorage.setItem('userToken', access_token);
        console.log('Access token stored successfully!');
      }
      
      Alert.alert('Success', 'Logged in successfully!');
      // Navigate to home screen or dashboard after successful login
      navigation.navigate("BottomTabs", { screen: "HomeScreen" });
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response) {
        Alert.alert('Login Failed', error.response.data.message || 'Invalid username or password. Please try again.');
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
        placeholder="Enter your Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
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
      <TouchableOpacity onPress={() => navigation.navigate("NewPassword")}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity 
        onPress={handleLogin}
        disabled={isLoading}
      >
        <LinearGradient
          colors={["#C525FF", "#391EDC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }} // top-to-bottom
          style={[
            styles.loginButton,
            { opacity: isLoading ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </Text>
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
