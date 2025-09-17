import axios from 'axios';
import toast from 'react-hot-toast';
import mock from './mock'

const axiosInstance = axios.create({
//   baseURL: '/api', // This can be your actual API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock adapter setup for demonstration
mock(axiosInstance);

// Response interceptor for handling errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // You can also handle successful responses here, e.g. show a success toast
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
      return Promise.reject(error);
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred. Please try again later.';
    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;