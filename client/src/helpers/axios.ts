import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3500' : 'https://expense-manager-server.vercel.app',
  withCredentials: true,
});

export function setAuthorizationToken(token: string) {
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['authorization'];
  }
}