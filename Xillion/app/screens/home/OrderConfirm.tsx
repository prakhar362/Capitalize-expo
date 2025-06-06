import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  Dimensions
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// Get screen width
// const { width } = Dimensions.get('window'); // width is not used anymore

const dummyStocks = [
  {
    id: 1,
    name: "TATAPOWER",
    logo: require("../../../assets/images/tata_power.png"),
    ltp: 1300,
  },
  {
    id: 2,
    name: "ZOMATO",
    logo: require("../../../assets/images/zomato.png"),
    ltp: 280,
  },
  {
    id: 3,
    name: "RELIANCE JIO",
    logo: require("../../../assets/images/jio.png"),
    ltp: 1200,
  },
  {
    id: 4,
    name: "RELIANCE JIO",
    logo: require("../../../assets/images/jio.png"),
    ltp: 1200,
  },
  {
    id: 5,
    name: "TATAPOWER",
    logo: require("../../../assets/images/tata_power.png"),
    ltp: 1300,
  },
  {
    id: 6,
    name: "ZOMATO",
    logo: require("../../../assets/images/zomato.png"),
    ltp: 280,
  },
];

export default function OrderConfirm() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 2,
    2: 1,
    3: 1,
    4: 1,
    5: 2,
    6: 2,
  });

  const handleIncrement = (id: number) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrement = (id: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }));
  };

  const calculateInvestment = (id: number, ltp: number) => {
    return (quantities[id] || 0) * ltp;
  };

  const totalAmount = dummyStocks.reduce(
    (sum, stock) => sum + calculateInvestment(stock.id, stock.ltp),
    0
  );

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={styles.header}>
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image 
                 source={require('../../../assets/images/back_arrow.png')}
                 style={styles.backIcon}
                                />
               </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Confirmation</Text>
        <TouchableOpacity style={styles.optionsButton} onPress={() => { /* Add options logic */ }}>
           <Ionicons name="options-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stock List */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        {dummyStocks.map((stock) => (
          <LinearGradient
            key={stock.id}
            colors={["#C525FF", "#391EDC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.stockCardGradientContainer}
          >
            <View style={styles.stockCardInner}>
              <View style={styles.stockRow}>
                <Image source={stock.logo} style={styles.logo} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.stockName}>{stock.name}</Text>
                  <Text style={styles.stockInfo}>LTP: ₹{stock.ltp}</Text>
                  <Text style={styles.stockInfo}>
                    Investment: ₹{calculateInvestment(stock.id, stock.ltp)}
                  </Text>
                </View>
                <View style={styles.counterBox}>
                  <TouchableOpacity onPress={() => handleDecrement(stock.id)}>
                    <Text style={styles.counterButton}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{quantities[stock.id]}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(stock.id)}>
                    <Text style={styles.counterButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        ))}
        </ScrollView>

        {/* Note and Total amount bottom part  */}
        <View style={[styles.bottomContainer, { paddingBottom: 20 + insets.bottom }]}>
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            NOTE: Investment amount is auto-calculated. Please change if required.
          </Text>
          <TouchableOpacity>
            <Ionicons name="close" size={22} color="white" />
          </TouchableOpacity>
        </View>

        {/* Total and Submit Button Row */}
        <View style={styles.totalSubmitRow}>
          <View style={styles.totalAmountSection}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>

          <TouchableOpacity style={styles.submitButtonInner} onPress={() => navigation.navigate('OrderSuccess')}>
            <LinearGradient
              colors={["#C525FF", "#391EDC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.submitButtonGradient}
            >
              <Text style={styles.buttonText}>SUBMIT</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        </View>
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201731",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    marginLeft:10,
  },
  optionsButton: {
    position: 'absolute',
    top: Platform.OS === "android" ? 40 : 60,
    right: 20,
    padding: 10,
    backgroundColor: "#0E0422",
    borderRadius: 10,
    zIndex: 1,
  },
  scrollArea: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  stockCardGradientContainer: {
    borderRadius: 14,
    marginBottom: 14,
    padding: 1,
  },
  stockCardInner: {
    backgroundColor: "#0e0422",
    borderRadius: 12,
    padding: 16,
    minHeight: 70,
    justifyContent: 'center',
  },
  stockRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 6,
  },
  stockName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  stockInfo: {
    color: "#ccc",
    fontSize: 13,
  },
  counterBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#822df9",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 36,
  },
  counterButton: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 6,
  },
  counterValue: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 8,
  },
  bottomContainer: {
    backgroundColor: "#0e0422",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  noteBox: {
    padding: 0,
    borderRadius: 0,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  noteText: {
    color: "#bbb",
    fontSize: 12,
    flex: 1,
    marginRight: 8,
  },
  totalSubmitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  totalAmountSection: {
  },
  totalText: {
    color: "#aaa",
    fontSize: 14,
  },
  totalAmount: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  submitButtonInner: {
  },
  submitButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
