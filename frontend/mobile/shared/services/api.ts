// src/services/api.ts
import axios from 'axios';
import { API_URL } from '../config/env.d';

console.log('api_url',API_URL)
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Interceptor (ex: token no futuro)
api.interceptors.request.use((config) => {
  // const token = await AsyncStorage.getItem('token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
