import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

type RouteParams = {
  mobileNumber: string;
};

export default function Verification() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const { mobileNumber } = route.params as RouteParams;

  const [code, setCode] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move focus to next input if available
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 4) {
      console.log("Code entered:", enteredCode);
      // Navigate or verify here
    }
  };

  const formattedTimer = `0${Math.floor(timer / 60)}:${String(
    timer % 60
  ).padStart(2, "0")}`;

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
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            Enter 4-digit code that we just sent to your phone number{" "}
            <Text style={styles.mobileNumber}>+91 {mobileNumber}</Text>
          </Text>
        </View>
      </View>

      {/* OTP Inputs */}
      <View style={styles.otpContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => {
              if (el) inputs.current[index] = el;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.otpBox,
              digit ? styles.otpBoxFilled : styles.otpBoxEmpty,
            ]}
            placeholder=""
            placeholderTextColor="#999"
            autoFocus={index === 0}
          />
        ))}
      </View>

      {/* Resend Timer */}
      <Text style={styles.resendText}>
        Resend code in <Text style={styles.timerText}>{formattedTimer}</Text>
      </Text>

      {/* Verify Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleVerify}>
        <LinearGradient
          colors={["#C525FF", "#391EDC"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.verifyButton}
        >
          <Text style={styles.verifyText}>Verify</Text>
        </LinearGradient>
      </TouchableOpacity>
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
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 12,
  },
  subtitle: {
    color: "#ccc",
    textAlign: "left",
    fontSize: 16,
    marginBottom: 20,
  },
  mobileNumber: {
    fontWeight: "bold",
    color: "#b366f7",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 10,
  },
  otpBox: {
    borderWidth: 1.5,
    borderColor: "#5e5e5e",
    borderRadius: 10,
    padding: 12,
    width: 55,
    height: 55,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  otpBoxFilled: {
    borderColor: "#b366f7",
  },
  otpBoxEmpty: {
    borderColor: "#5e5e5e",
  },
  resendText: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
    fontSize: 14,
  },
  timerText: {
    color: "#b366f7",
    fontWeight: "600",
  },
  verifyButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  verifyText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
