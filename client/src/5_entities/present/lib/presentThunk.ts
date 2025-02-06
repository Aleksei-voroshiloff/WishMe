import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { PresentObjShema, type PresentObjType } from '../types/presentType';

export const getAllPresent = createAsyncThunk(
  'present/PresentForFriends',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<PresentObjType>('/wish/busy');
      return PresentObjShema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
