import axios from 'axios';

// Get the base URL from environment variables
const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://backend.xillion.in';

console.log("Base URL: ", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;