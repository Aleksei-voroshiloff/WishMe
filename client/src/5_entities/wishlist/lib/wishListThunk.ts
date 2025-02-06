import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { UpdatewishListForm, WishListObjectType } from '../types/types';
import { WishListObjectSchema, WishListSchema } from '../types/types';
import axiosInstance from '../../../6_shared/api/axiosInstance';

export const getWishList = createAsyncThunk('list/getWishList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(`/wishlist`);
    return WishListSchema.parse(data);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
  }
});

export const getOneWishList = createAsyncThunk(
  'list/getOneWishList',
  async (listId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<WishListObjectType>(`/wishlist/${String(listId)}`);
      // console.log(data, 'getOneList');
      return data;
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const addWishList = createAsyncThunk(
  'list/addWishList',
  async (wishlistData: Omit<WishListObjectType, 'id'>, { rejectWithValue }) => {
    console.log(wishlistData, 'bookData');

    try {
      const { data } = await axiosInstance.post(`/wishlist`, wishlistData);
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
  async (listId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<WishListObjectType>(`/api/wishlist/${String(listId)}`);
      console.log('WishList deleted:', data);

      return listId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const getFriendWishListThunk = createAsyncThunk('list/getFriendWishListThunk', async(friendId: number, {rejectWithValue})=> {
  try {
    const response = await axiosInstance.get(`/wishlist/friend/${String(friendId)}`);
    return WishListSchema.parse(response.data)
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так с getFriendWishListThunk');
  }
})