import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ColorValue, Alert,Image, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MainTabParamList } from '../../navigation/types';
import { LinearGradient } from "expo-linear-gradient";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SwipeButton } from "react-native-expo-swipe-button";
import { useFonts } from 'expo-font';
import { useState } from 'react';
import BrokerSelection from '../../components/BrokerSelection';

type HomeScreenNavigationProp = BottomTabNavigationProp<MainTabParamList>;
type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const rootNavigation = useNavigation<RootStackNavigationProp>();
  const gradientColorsUpper: [ColorValue, ColorValue] = ["#C525FF", "#391EDC"];
  const gradientColorsRecommendations: [ColorValue, ColorValue] = ["#C425FF", "#391FDC"];

  const [isBrokerSelectionVisible, setIsBrokerSelectionVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Syne-Regular': require('../../../assets/fonts/Syne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  // Dummy data for recommendations
  const recommendations = [
    {
      name: "ASHOKA",
      buy: "₹248-251",
      stopLoss: "₹223",
      target: "₹273",
      change: "+10%",
    },
    {
      name: "IOLCP",
      buy: "₹460-470",
      stopLoss: "₹350",
      target: "₹520",
      change: "+19%",
    },
    {
      name: "GENESYS",
      buy: "₹775-786",
      stopLoss: "₹698",
      target: "₹852",
      change: "+8.3%",
    },
    {
      name: "ADANI POWER",
      buy: "₹775-786",
      stopLoss: "₹698",
      target: "₹852",
      change: "+10.3%",
    },
    {
      name: "APPLE INC.",
      buy: "₹775-786",
      stopLoss: "₹698",
      target: "₹852",
      change: "+7.3%",
    },
  ];

  const handleExecute = () => {
    Alert.alert("Execute", "Executing trades...");
    rootNavigation.navigate('OrderConfirm');
  };

  return (
    <View style={[styles.container, { paddingBottom: 60 + insets.bottom }]}>
      {/* Upper Section with Gradient */}
      <LinearGradient
        colors={gradientColorsUpper}
        style={styles.upperSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Feather name="user" size={25} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>XILLION</Text>
          <Image 
            source={require('../../../assets/images/notification.png')}
            style={styles.headerIcon}
          />
        </View>

        <TouchableOpacity style={styles.connectBrokerButton} onPress={() => {
          console.log("Connect Broker button pressed, setting isBrokerSelectionVisible to true");
          setIsBrokerSelectionVisible(true);
        }}>
          <Text style={styles.connectBrokerButtonText}>Connect Broker</Text>
        </TouchableOpacity>
       
        {/*Portfolio section */}
        <View style={styles.portfolioSection}>
          <Text style={styles.portfolioTitle}>Current Portfolio</Text>
          <View style={styles.portfolioValueContainer}>
            <Text style={styles.portfolioValue}>₹12,78,653</Text>
            <Feather name="refresh-ccw" size={18} style={styles.refresh} color="#fff" />
          </View>

          <Text style={styles.unusedFundsTitle}>Unused Funds</Text>
          <Text style={styles.unusedFundsValue}>₹1,18,261</Text>
        </View>
      </LinearGradient>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('History')}>
          <Image 
            source={require('../../../assets/images/download.png')}
            style={styles.actionIcon}
          />
          <Text style={styles.actionButtonText}>Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => rootNavigation.navigate('ChatAI')}>
          <Image 
            source={require('../../../assets/images/chat.png')}
            style={styles.actionIcon}
          />
          <Text style={styles.actionButtonText}>Ask AI</Text>
        </TouchableOpacity>
      </View>

      {/* Today's Recommendations Section */}
      <Text style={styles.recommendationsTitle}>Today's Recommendations</Text>

      <View style={styles.recommendContainer}>
        <ScrollView style={styles.recommendationsList}>
          {recommendations.map((item, index) => (
            <LinearGradient
              key={index}
              colors={gradientColorsRecommendations}
              style={styles.recommendationItem}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.recommendationItemContent}>
                <View style={styles.headerRow}>
                  <Text style={styles.recommendationName}>{item.name}</Text>
                  <Text
                    style={[
                      styles.recommendationChange,
                      { color: item.change.startsWith('+') ? '#00FF00' : '#FF0000' },
                    ]}
                  >
                    {item.change}
                  </Text>
                </View>

                <View style={styles.recommendationDetails}>
                  <View style={styles.recommendationDetailItem}>
                    <Text style={styles.recommendationDetailTitle}>Buy</Text>
                    <Text style={styles.recommendationDetailValue}>{item.buy}</Text>
                  </View>
                  <View style={styles.recommendationDetailItem}>
                    <Text style={styles.recommendationDetailTitle}>Stop Loss</Text>
                    <Text style={styles.recommendationDetailValue}>{item.stopLoss}</Text>
                  </View>
                  <View style={styles.recommendationDetailItem}>
                    <Text style={styles.recommendationDetailTitle}>Target</Text>
                    <Text style={styles.recommendationDetailValue}>{item.target}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          ))}
        </ScrollView>

        <Text style={styles.executionNote}>
          On executing this basket, buy orders along with stop loss and targets will be placed.
        </Text>
      </View>

      {/* Execute Button */}
      <View style={styles.executeButtonContainer}>
        <SwipeButton
          onComplete={handleExecute}
          title="EXECUTE"
          containerStyle={styles.swipeButtonContainer}
          titleStyle={styles.swipeButtonTitle}
          circleBackgroundColor="#fff"
          Icon={<MaterialCommunityIcons name="lightning-bolt" size={30} color="#000" />}
          height={50}
          borderRadius={50}
          circleSize={60}
          underlayContainerGradientProps={{
            colors: gradientColorsUpper as string[],
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 },
          }}
          underlayStyle={{ borderRadius: 50 }}
        />
      </View>

      {isBrokerSelectionVisible && (
        <BrokerSelection 
          isVisible={isBrokerSelectionVisible} 
          onClose={() => setIsBrokerSelectionVisible(false)} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201731",
  },
  upperSection: {
    padding: 30,
    paddingBottom: 50,
    borderRadius:10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },
  headerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "white",
    fontFamily: 'Syne-Regular',
  },
  portfolioSection: {
    alignItems: "center"
  },
  portfolioTitle: {
    fontSize: 16,
    color: "#eee",
    marginBottom: 4,
  },
  portfolioValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 5,
    marginLeft: 10,
  },
  refresh: {
    marginTop: 10,
    marginLeft: 5,
  },
  unusedFundsTitle: {
    fontSize: 14,
    color: "#eee",
    marginBottom: 4,
  },
  unusedFundsValue: {
    fontSize: 18,
    color: "#fff",
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: "row",
    marginTop: -15,
    justifyContent: "center",
    width: "100%",
  },
  actionIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "#07022d",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 25,
    marginLeft: 16,
    textAlign: 'center'
  },
  recommendContainer: {
    flex: 1,
    backgroundColor: '#777777',
    borderRadius: 20,
    margin: 8,
    paddingTop: 10,
    overflow: 'hidden',
  },
  recommendationsList: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    maxHeight: 350,
  },
  recommendationItem: {
    borderRadius: 12,
    marginHorizontal: 10,
    marginBottom: 8,
    padding: 10,
  },
  recommendationItemContent: {
    flexDirection: "column",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recommendationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  recommendationChange: {
    fontSize: 20,
    fontWeight: "normal",
  },
  recommendationDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recommendationDetailItem: {
    flex: 1,
    alignItems: "center",
  },
  recommendationDetailTitle: {
    fontSize: 12,
    color: "#eee",
    marginBottom: 4,
  },
  recommendationDetailValue: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  executionNote: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: 'semibold',
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 10,
  },
  executeButtonContainer: {
    padding: 6,
  },
  swipeButtonContainer: {
    width: "100%",
    backgroundColor: "#777777",
    borderRadius: 50,
    height: 50,
  },
  swipeButtonTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#fff",
  },
  connectBrokerButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
  },
  connectBrokerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
}); 