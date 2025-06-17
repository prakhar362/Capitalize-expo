import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
         'Syne-Regular': require('../../../assets/fonts/Syne-Regular.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <LinearGradient
        colors={["#C426FF", "#391FDC"]}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Image 
            source={require('../../../assets/images/back_arrow.png')}
            style={styles.backButtonImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar and Name */}
        <View style={styles.profileContainer}>
          <Image
            source={require("../../../assets/images/user_1.png")} // Replace with actual user image
            style={styles.avatar}
          />
          <Text style={styles.userName}>Rushirajsinh Parmar</Text>
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <OptionItem icon="person-outline" label="My Account" />
          <OptionItem icon="card-outline" label="Billing/Payment" />
          <OptionItem icon="help-circle-outline" label="FAQ & Support" />
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <OptionItem icon="language-outline" label="Language" />
        </View>
      </ScrollView>
    </View>
  );
}

type OptionItemProps = {
  icon: string;
  label: string;
};

const OptionItem = ({ icon, label }: OptionItemProps) => {
  return (
    <TouchableOpacity style={styles.option}>
      <View style={styles.iconBox}>
        <Ionicons name={icon as any} size={20} color="white" />
      </View>
      <Text style={styles.optionLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="white" style={{ marginLeft: "auto" }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201731",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    position: 'relative',
    height: 90,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 15,
    bottom: 0,
    justifyContent: 'center',
    padding: 10,
    zIndex: 1,
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Syne-Regular',
    color: "white",
    marginTop:-12,
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#555",
  },
  userName: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: "#aaa",
    marginBottom: 12,
    fontWeight: "600",
    fontSize: 14,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  iconBox: {
    width: 32,
    height: 32,
    backgroundColor: "#0E0422",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  optionLabel: {
    color: "white",
    fontSize: 15,
  },
});
