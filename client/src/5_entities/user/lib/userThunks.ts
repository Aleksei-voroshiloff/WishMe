import axiosInstance, { setAccessToken } from '../../../6_shared/api/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AuthResponse, LoginCredentials, RegisterFormData } from '../types/types';

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<AuthResponse>('/tokens/refresh');
    setAccessToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const submitHandler = createAsyncThunk(
  'user/submitHandler',
  async (formData: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/register', formData);
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const loginHandler = createAsyncThunk(
  'user/loginHandler',
  async (formData: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/login', formData);
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const logoutHandler = createAsyncThunk(
  'user/logoutHandler',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.get('/auth/logout');
      setAccessToken('');
      return 'Logout - success';
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
