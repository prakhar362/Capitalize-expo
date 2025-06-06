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

export default function Profile() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Bold': require('../../../assets/fonts/Inter_28pt-Bold.ttf'),
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
      {/* Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
         <Image 
          source={require('../../../assets/images/back_arrow.png')}
          style={styles.backIcon}
                         />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>User Profile</Text>
        </View>
      </View>

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
    paddingTop: 50,
    position: 'relative',
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
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 20, // Add space to account for back button
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: "white",
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
