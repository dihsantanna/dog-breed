import axios from 'axios';
import { IUser } from '../types/IUser';
import { IErrorApi } from '../types/IErrorApi';
import { IDogBreed } from '../types/IDogBreed';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
  try {
    const { data, status } = await api.get(endpoint);
    return { data: data as IDogBreed, status };
  } catch (err) {
    const { data, status } = (err as IErrorApi).response;
    return { data, status };
  }
};

export const requestLogin = async (endpoint: string, body: { email: string }) => {
  try {
    const { data, status } = await api.post(endpoint, body);
    return { data: data as IUser, status };
  } catch (err) {
    const { data, status } = (err as IErrorApi).response;
    return { data, status };
  }
};

export default api;
