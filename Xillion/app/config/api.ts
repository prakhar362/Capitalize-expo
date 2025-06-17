import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get the base URL from environment variables
const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://backend.xillion.in';
const X_ACCESS_TOKEN = process.env.EXPO_PUBLIC_X_ACCESS_TOKEN || '';

console.log("Base URL: ", API_BASE_URL);

// Save token to AsyncStorage (once at app start or module load)
if (X_ACCESS_TOKEN) {
  AsyncStorage.setItem('x_access_token', X_ACCESS_TOKEN)
    .then(() => console.log('x_access_token saved to AsyncStorage'))
    .catch(err => console.error('Failed to save x_access_token:', err));
}
console.log("Broker Access: ", X_ACCESS_TOKEN);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-broker-access-token':X_ACCESS_TOKEN
  },
});

export default api;