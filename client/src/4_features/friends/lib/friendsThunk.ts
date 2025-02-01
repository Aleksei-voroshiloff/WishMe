import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { oneFriendSchema, receivefriendsSchema } from '../types/types';

export const getAllFriends = createAsyncThunk(
  'friend/getAllFriends',
  (
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get('/friend');
      const data = receivefriendsSchema.parse(response.data);
      return data.map((item) => item.Receiver)
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }),
);

export const addFriend = createAsyncThunk(
  'friend/addFriend',
  (
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.post('/friend', id);
      const data = oneFriendSchema.parse(response.data);
      return data
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }),
);

export const deleteFriend = createAsyncThunk(
  'friend/deleteFriend',
  (
  async (id: number, {rejectWithValue}) => {
    try {
      await axiosInstance.delete(`/friend/${String(id)}`);
      return id
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }),
);
