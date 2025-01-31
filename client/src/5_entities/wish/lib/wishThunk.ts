import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UpdatewishForm, WishObjectType } from '../types/types';
import { WishObjectSchema, WishSchema } from '../types/types';

export const getWish = createAsyncThunk('wish/getWish', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/wish`);
    console.log(data);

    return WishSchema.parse(data);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
  }
});

export const addWish = createAsyncThunk(
  'wish/addWish',
  async (bookData: Omit<WishObjectType, 'id'>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/wish`, bookData);
      console.log('Wish created:', data);

      return WishObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const updateWish = createAsyncThunk(
  'wish/updateWish',
  async ({ wishId, wishData }: UpdatewishForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/wish/${String(wishId)}`, wishData);
      console.log('Wish updated:', data);

      return WishObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const deleteWish = createAsyncThunk<number, number>(
  'wish/deleteWish',
  async (bookId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<WishObjectType>(`/api/wish/${String(bookId)}`);
      console.log('Wish deleted:', data);

      return bookId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
