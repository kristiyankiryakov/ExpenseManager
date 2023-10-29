import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true,
});

export function setAuthorizationToken(token: string) {
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['authorization'];
  }
}