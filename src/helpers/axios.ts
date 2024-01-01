import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://expense-manager-ivory.vercel.app/',
  withCredentials: true,
});

export function setAuthorizationToken(token: string) {
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['authorization'];
  }
}