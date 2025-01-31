import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UpdatewishListForm, WishListObjectType } from '../types/types';
import { WishListObjectSchema, WishListSchema } from '../types/types';

export const getWishList = createAsyncThunk('list/getWishList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/api/wishlist`);
    console.log(data);

    return WishListSchema.parse(data);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
  }
});

export const addWishList = createAsyncThunk(
  'list/addWishList',
  async (bookData: Omit<WishListObjectType, 'id'>, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/wishlist`, bookData);
      console.log('WishList created:', data);

      return WishListObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const updateWishList = createAsyncThunk(
  'list/updateWishList',
  async ({ wishListId, wishListData }: UpdatewishListForm, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/wishlist/${String(wishListId)}`, wishListData);
      console.log('WishList updated:', data);

      return WishListObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const deleteWishList = createAsyncThunk<number, number>(
  'list/deleteWishList',
  async (bookId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<WishListObjectType>(`/api/wishlist/${String(bookId)}`);
      console.log('WishList deleted:', data);

      return bookId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);
