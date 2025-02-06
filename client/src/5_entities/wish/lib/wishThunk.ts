import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import type { PresentObjType, UpdatewishForm, WishObjectType } from '../types/types';
import { WishObjectSchema, WishSchema } from '../types/types';
import axiosInstance from '../../../6_shared/api/axiosInstance';


export const getWish = createAsyncThunk(
  'wish/getWish',
  async (wishListId: number, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<WishObjectType[]>(`/api/wish`, { params: { wishListId } });
      console.log(data, 'getwish');
      console.log(WishSchema.parse(data), 'getwish1');

      return WishSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const addWish = createAsyncThunk(
  'wish/addWish',
  async (wishData: Omit<WishObjectType, 'id'>, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(`/wish`, wishData);
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
      const { data } = await axiosInstance.put(`/wish/${String(wishId)}`, wishData);
      console.log('Wish updated:', data);

      return WishObjectSchema.parse(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const deleteWish = createAsyncThunk<number, number>(
  'wish/deleteWish',
  async (wishId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<WishObjectType>(`/api/wish/${String(wishId)}`);
      console.log('Wish deleted:', data);

      return wishId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const getPresInfo = createAsyncThunk(
  'wish/getPresInfo',
  async (wishId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get<PresentObjType>(`/present/${String(wishId)}`);
      console.log(data, 'getPresInfo');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const toggleReservation = createAsyncThunk(
  'wish/toggleReservation',
  async (wishId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<PresentObjType>(`/present/${String(wishId)}`);
      console.log(data, 'created present');
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка бронирования');
    }
  },
);

// export const toggleReservation = createAsyncThunk(
//   'wish/toggleReservation',
//   async (wishId) => {
//     console.log(wishId, 222222);

//       // console.log(isReserved, 'qqqqqqqqqqq');
//       // console.log(isReserved, 'wishID');

//       // if (isReserved) {
//       //   await axiosInstance.delete(`/presents/${String(wishId)}`);
//       //   return null;
//       // }
//       const { data } = await axiosInstance.post<PresentObjType>('/presents', { wishId });
//       return data;

//   },
// );
