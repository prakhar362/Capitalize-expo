import { Text, View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  ChatAI: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
      <Text style={styles.headerTitle}>Login</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>Login Page will come here</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('ChatAI')}
          >
            <Text style={styles.buttonText}>Go to Chat AI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#21083a",
  },
  header: {
    padding: 30,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 