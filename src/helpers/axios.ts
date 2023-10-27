import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3500', // Your API base URL
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${Cookies.get('jwt')}`
    }
  });

  export default axiosInstance;