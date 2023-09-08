import axios from 'axios';
import NProgress from 'nprogress';
import { router } from '@/router';

const port = window.location.port === '' ? '' : `:${window.location.port}`;
const baseUrl = `${window.location.protocol}//${window.location.hostname}${port}`;
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND + '/api';

axios.interceptors.request.use(
  config => {
    NProgress.start();
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.set('Authorization', 'Bearer ' + token);
    }
    console.log(config);
    return config;
  },
  error => {
    console.log(error);
    NProgress.done();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  config => {
    NProgress.done();
    return config;
  },
  async error => {
    console.log(error);
    NProgress.done();
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes('Unauthenticated') && !originalRequest._retry) {
      router.push('/login');
      originalRequest._retry = true;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;
