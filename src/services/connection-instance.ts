import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ez-api.deadgroup.dev/',
  timeout: 20000,
});

instance.interceptors.request.use(
  config => {
    if (__DEV__) {
      console.info('Request:', config);
    }
    // Do something before request is sent
    return config;
  },
  error => {
    if (__DEV__) {
      console.error('Request Error:', error);
    }
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    if (__DEV__) {
      console.info('Response:', response);
    }

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  error => {
    if (__DEV__) {
      console.error('Response Error:', error);
    }
    const errorMessage = error?.response?.data?.message;
    if (errorMessage) {
      return Promise.reject(new Error(errorMessage));
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export const setToken = (token: string) => {
  instance.defaults.headers = {
    ...instance.defaults.headers,
    Authorization: `Bearer ${token}`,
  };
};

export const clearToken = () => {
  delete instance.defaults.headers.Authorization;
};

export default instance;
