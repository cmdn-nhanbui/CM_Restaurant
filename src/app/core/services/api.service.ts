import axios from 'axios';
import { getLS, KEYS } from '../helpers/storageHelper';

const baseURL = import.meta.env.VITE_API_URL;

const request = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420',
  },
});

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    const accessToken = getLS(KEYS.ACCESS_TOKEN);
    if (accessToken) {
      if (config.headers?.set) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

export const setHeaderConfigAxios = (token: string) => {
  if (token) {
    request.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : '';
  } else {
    delete request.defaults.headers.common['Authorization'];
  }
};

export default request;
