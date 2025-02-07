import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { PresentObjShema, userIdSchema, type PresentObjType } from '../types/presentType';

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

export const getUserIdByWishIdThunk = createAsyncThunk(
  'wish/getUserIdByWishIdThunk',
  async (wishId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<object>(`/present/wish/${String(wishId)}`);
      const objectWithId = userIdSchema.parse(data)
      return objectWithId.userId
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
