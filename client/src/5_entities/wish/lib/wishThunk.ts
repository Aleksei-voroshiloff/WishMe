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
      const { data } = await axiosInstance.post<WishObjectType>(`/wish`, wishData);
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
      const { data } = await axiosInstance.put<WishObjectType>(`/wish/${String(wishId)}`, wishData);
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
      await axios.delete<WishObjectType>(`/api/wish/${String(wishId)}`);
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
      const { data } = await axiosInstance.get<boolean>(`/present/${String(wishId)}`);

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Что-то пошло не так');
    }
  },
);

export const postReservation = createAsyncThunk(
  'wish/postReservation',
  async (wishId: number, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post<PresentObjType>(`/present/${String(wishId)}`);

      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка бронирования');
    }
  },
);

export const deleteReservation = createAsyncThunk(
  'wish/deleteReservation',
  async (wishId: number) => {
    try {
      await axiosInstance.delete(`/present/${String(wishId)}`);
      return wishId;
    } catch (error) {
      console.log(error);
      return 'Подарок забронирован';
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
