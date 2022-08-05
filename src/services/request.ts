import axios from 'axios';
import { IUser } from '../types/IUser';
import { IErrorApi } from '../types/IErrorApi';
import { IDogBreed } from '../types/IDogBreed';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint: string) => {
  const { data, status } = await api.get(endpoint);
  return { data: data as IDogBreed | IErrorApi, status };
};

export const requestLogin = async (endpoint: string, body: { email: string }) => {
  const { data, status } = await api.post(endpoint, body);
  return { data: data as IUser | IErrorApi, status };
};

export default api;
