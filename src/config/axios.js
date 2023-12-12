import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || '';

const token = localStorage.getItem('mymarvin_token') || null;

const Axios = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('>> ERR: ', error);
    if (error.response.status === 401) {
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default Axios;
