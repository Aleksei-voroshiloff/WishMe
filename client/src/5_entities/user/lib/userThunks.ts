import axiosInstance, { setAccessToken } from '../../../6_shared/api/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { getUserType, MyDataType } from '../types/types';
import {
  OneUserShema,
  type AuthResponse,
  type DataUpdateType,
  type LoginCredentials,
  type OneUserType,
  type RegisterFormData,
} from '../types/types';

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
export const getOneUser = createAsyncThunk(
  'user/infoOneUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<OneUserType>(`/users/${String(id)}`);

      const filteredData = OneUserShema.parse(response.data);
      return filteredData;
    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  'user/updateInfo',
  async ({ id, updateData }: DataUpdateType, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.put<MyDataType>(`/users/${String(id)}`, updateData);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const myCabinetInfo = createAsyncThunk(
  'user/myCabinet',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<MyDataType | null>(`/users/my/${String(id)}`);
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const getUserByWishlistThunk = createAsyncThunk(
  'user/getUserByWishlistThunk',
  async (id: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<getUserType | null>(`/users/wishlist/${String(id)}`);
      const user = OneUserShema.parse(data?.User);
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);
