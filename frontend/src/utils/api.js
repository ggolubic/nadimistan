import axios from 'axios';

const getBackendUrl = () => {
  if (process.env.NODE_ENV !== 'PRODUCTION') {
    return 'http://0.0.0.0:8000';
  }
  //change when deployed
  return 'http://0.0.0.0:8000';
};

const createBackendInstance = () => {
  return axios.create({
    baseURL: `${getBackendUrl()}/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const api = createBackendInstance();

let _token = null;

export const setAuthToken = token => {
  _token = token;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  _token = null;
  delete api.defaults.headers.common['Authorization'];
};

export const getToken = () => {
  return _token;
};

export default api;
