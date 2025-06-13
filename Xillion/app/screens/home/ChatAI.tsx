import { Text, View, StyleSheet, Platform, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import Sidebar from '../../components/sidebar';
import { useFonts } from 'expo-font';


type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Message = {
  role: "user" | "ai"
  text: string
  timestamp?: string
}

export default function ChatAI() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Need real-time analysis to make informed decisions?",
      timestamp: "10:30 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [fontsLoaded] = useFonts({
      'Syne-Regular': require('../../../assets/fonts/Syne-Regular.ttf'),
    });

  if (!fontsLoaded) {
    return null; // Or a loading indicator
  }

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage: Message = {
      role: "user",
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");
    setShowSuggestions(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const aiResponse: Message = {
        role: "ai",
        text: getAIResponse(newMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      role: "user",
      text: suggestion,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, userMessage]);
    setShowSuggestions(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const aiResponse: Message = {
        role: "ai",
        text: getAIResponse(suggestion),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1500);
  };

  const getAIResponse = (message: string) => {
    if (message.toLowerCase().includes("kpigreen") || message.toLowerCase().includes("stock")) {
      return "Here's my analysis of KPIGREEN stock:\n\n**Fundamental Analysis:**\n\n• Revenue Growth: 15.2% YoY increase in the last quarter\n• Profit Margins: Improved to 8.7% from 7.2% last year\n• Debt-to-Equity: Healthy ratio of 0.4\n• P/E Ratio: Currently at 22.3, slightly above industry average of 19.8\n\n**Technical Analysis:**\n\n• Currently trading above both 50-day and 200-day moving averages\n• RSI at 62, indicating moderate buying momentum without being overbought\n• MACD shows positive crossover on the daily chart\n• Support levels at ₹450 and ₹420, resistance at ₹510";
    } else if (message.toLowerCase().includes("trump") || message.toLowerCase().includes("tariff")) {
      return "Trump's proposed tariffs could impact Indian markets in several ways:\n\n1. Export Sectors: IT services, pharmaceuticals, and textiles could face pressure if US imposes higher tariffs\n\n2. Currency Effects: Potential INR depreciation against USD if global trade tensions rise\n\n3. Indirect Benefits: Some manufacturing could shift to India as companies diversify from China\n\n4. Sector-Specific Impacts: Auto components and steel exports might face direct tariff challenges\n\n5. Market Volatility: Expect increased volatility in Indian equity markets during policy implementation phases";
    } else if (message.toLowerCase().includes("fta") || message.toLowerCase().includes("uk-india")) {
      return "The UK-India Free Trade Agreement (FTA) is expected to have these key impacts:\n\n• Tariff Reductions: Elimination of duties on 94% of Indian exports to UK\n\n• Services Boost: Indian IT, financial services, and healthcare sectors to benefit significantly\n\n• Investment Growth: Increased UK investments in Indian infrastructure and manufacturing\n\n• Job Creation: Estimated 40,000+ new jobs in export-oriented sectors\n\n• GDP Impact: Potential to add 0.3% to India's GDP over 5 years\n\n• Specific Beneficiaries: Textiles, pharmaceuticals, and agricultural products expected to see major export growth";
    } else {
      return "I'm here to help with your trading and investment questions. You can ask me about:\n\n• Market analysis and trends\n• Specific stocks or crypto assets\n• Portfolio optimization strategies\n• Risk management techniques\n• Technical and fundamental analysis\n\nWhat specific information would you like to know today?";
    }
  };

  const suggestions = [
    "Analyse KPIGREEN stock fundamentally & technically",
    "How does Trump tariff's affect Indian markets?",
    "Impact of UK-India FTA deal",
  ];

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <LinearGradient
        colors={['#C425FF', '#391FDC']}
        style={styles.header}
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
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Xillion AI</Text>
        </View>
        <TouchableOpacity style={styles.newChatButton} onPress={() => setSidebarOpen(true)}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageWrapper,
              message.role === "user" ? styles.userMessageWrapper : styles.aiMessageWrapper,
              index === 0 && message.role === "ai" && styles.welcomeMessageWrapper
            ]}
          >
            {index === 0 && message.role === "ai" ? (
              <LinearGradient
                colors={['rgba(147, 51, 234, 0.3)', 'rgba(59, 130, 246, 0.3)']}
                style={styles.welcomeMessage}
              >
                <Text style={styles.welcomeMessageText}>{message.text}</Text>
              </LinearGradient>
            ) : (
              <View style={[
                styles.messageBubble,
                message.role === "user" ? styles.userMessageBubble : styles.aiMessageBubble
              ]}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={[
                  styles.messageTimestamp,
                  message.role === "user" ? styles.userMessageTimestamp : styles.aiMessageTimestamp
                ]}>
                  {message.timestamp}
                </Text>
              </View>
            )}
          </View>
        ))}

        {isLoading && (
          <View style={styles.loadingContainer}>
            <View style={styles.loadingDots}>
              <View style={styles.loadingDot} />
              <View style={styles.loadingDot} />
              <View style={styles.loadingDot} />
            </View>
          </View>
        )}
      </ScrollView>

      {showSuggestions && (
        <View style={styles.suggestionsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleSuggestionClick(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <LinearGradient
        colors={['#201731', '#2D1F4A']}
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.inputButton}>
          <Ionicons name="attach" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <LinearGradient
            colors={["#C425FF", "#391FDC"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.inputGradient}
          >
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type your question here..."
              placeholderTextColor="#9CA3AF"
              multiline
            />
          </LinearGradient>
        </View>
        {newMessage ? (
          <TouchableOpacity 
            style={styles.inputButton}
            onPress={() => setNewMessage("")}
          >
            <Ionicons name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.inputButton}>
            <Ionicons name="mic" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.sendButton,
            !newMessage.trim() && styles.sendButtonDisabled
          ]}
          onPress={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <LinearGradient
            colors={newMessage.trim() ? ['#9333EA', '#3B82F6'] : ['#4B5563', '#4B5563']}
            style={styles.sendButtonGradient}
          >
            <Ionicons name="send" size={24} color={newMessage.trim() ? "white" : "#9CA3AF"} />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201731",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    fontFamily: 'Syne-Regular',
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#4ADE80",
  },
  newChatButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  aiMessageWrapper: {
    alignItems: 'flex-start',
  },
  welcomeMessageWrapper: {
    alignItems: 'center',
  },
  welcomeMessage: {
    padding: 16,
    borderRadius: 12,
    maxWidth: '80%',
  },
  welcomeMessageText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '85%',
  },
  userMessageBubble: {
    backgroundColor: '#9333EA',
    borderTopRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: '#2D1F4A',
    borderTopLeftRadius: 4,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'right',
  },
  userMessageTimestamp: {
    color: '#E9D5FF',
  },
  aiMessageTimestamp: {
    color: '#9CA3AF',
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginTop: 8,
  },
  loadingDots: {
    flexDirection: 'row',
    backgroundColor: '#2D1F4A',
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 4,
  },
  suggestionsContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  suggestionButton: {
    backgroundColor: '#2D1F4A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  suggestionText: {
    color: 'white',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  inputButton: {
    padding: 8,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 24,
    padding: 1, // This creates space for the gradient border
  },
  inputGradient: {
    borderRadius: 24,
    padding: 1, // This creates space for the gradient border
  },
  input: {
    backgroundColor: '#201731',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: 'white',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.7,
  },
}); 