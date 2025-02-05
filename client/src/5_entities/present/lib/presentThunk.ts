import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../6_shared/api/axiosInstance';

export const getAllPresent = createAsyncThunk(
  'present/PresentForFriends',
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await axiosInstance.get('/present')
        return data 
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
