import axios from 'axios';
export const BASE_URL = process.env.BASE_URL;

export const getToken = () => {
  const token = localStorage.getItem('authToken');
  return token;
};

const api = axios.create({
  baseURL: BASE_URL, // Set your base URL here
  headers: {
    'Content-Type': 'application/json',
  },
});


//add authToken to API call if exists
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


//can be commented while devlopment
api.interceptors.response.use(
  (response) => response, 
  (error) => {
      if (error.response && error.response.status === 401) {
          window.location.href = "/signin";
      }
      return Promise.reject(error);
  }
);

export default api;