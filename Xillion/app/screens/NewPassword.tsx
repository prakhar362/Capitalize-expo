import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NewPassword() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure1, setSecure1] = useState(true);
  const [secure2, setSecure2] = useState(true);

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill both fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    Alert.alert("Success", "New password created", [
      {
        text: "OK",
        onPress: () => navigation.navigate('Login'),
      },
    ]);
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
            source={require('../../assets/images/back_arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Create New Password</Text>
          <Text style={styles.subtext}>
            Your new password must be different from previous used passwords.
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secure1}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure1(!secure1)}>
            <Ionicons
              name={secure1 ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor="#aaa"
            secureTextEntry={secure2}
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setSecure2(!secure2)}>
            <Ionicons
              name={secure2 ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.buttonContainer}
          onPress={handleSubmit}
        >
          <LinearGradient
            colors={["#C525FF", "#391EDC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Create Password</Text>
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
  subtext: {
    color: "#ccc",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    gap: 20,
    width: '100%',
  },
  inputWrapper: {
    backgroundColor: "#2e1b47",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#444",
    height: 50,
    justifyContent: "space-between",
    width: '100%',
  },
  input: {
    color: "white",
    flex: 1,
    fontSize: 16,
    paddingRight: 10,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
