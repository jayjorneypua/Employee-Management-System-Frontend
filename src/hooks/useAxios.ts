import axios from "axios";

const useAxios = axios.create({
  baseURL: "http://localhost:5159/api", 
  
});

useAxios.interceptors.request.use((config) => {
  if (config.url && (config.url.includes('/Employees'))) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default useAxios;
