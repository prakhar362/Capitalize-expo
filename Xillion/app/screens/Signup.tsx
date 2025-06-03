import { Text, View, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Signup() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
        <Text style={styles.headerTitle}>Signup Page</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>signup  Page will come here</Text>
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
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
}); 