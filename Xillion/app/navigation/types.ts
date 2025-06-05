export  type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  NewPassword: undefined;
  BottomTabs: { screen?: keyof MainTabParamList; params?: any }; // Allow passing screen and params to BottomTabs
  OrderConfirm: undefined;
  OrderSuccess: undefined;
  ChatAI: undefined;
};

export type MainTabParamList = {
  HomeScreen: undefined;
  History: undefined;
  Profile: undefined; // Matching the tab name in BottomTabNavigator.tsx
}; 