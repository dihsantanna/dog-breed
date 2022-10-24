import { User } from '@supabase/supabase-js';
import axios from 'axios';
import { IDogBreed } from '../types/IDogBreed';
import { IErrorApi } from '../types/IErrorApi';
import { IUser } from '../types/IUser';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const requestData = async (breed: string) => {
  try {
    const { error } = await supabase.auth.getSession();
    if (error) throw error;
    const { data, status } = await api.get(`/${breed}/images`);
    return { data: data as IDogBreed, status };
  } catch (err) {
    const { data, status } = (err as IErrorApi).response;
    return { data, status };
  }
};

export const requestLogin = async (email: string): Promise<IUser> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: import.meta.env.VITE_SUPABASE_PASS,
  });

  if (error) {
    const { data: data2, error: error2 } = await supabase.auth.signUp({
      email,
      password: import.meta.env.VITE_SUPABASE_PASS,
    });

    if (error2) throw error2;

    return data2.user as User;
  }

  return data.user as User;
};

export default api;
