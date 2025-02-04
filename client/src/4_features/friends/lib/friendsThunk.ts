import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { friendsSchema, oneFriendSchema, receivefriendsSchema, receivesToFriendSchema } from '../types/types';

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

export const addFriendThunk = createAsyncThunk('friend/addFriendThunk', async(id: number, {rejectWithValue})=>{
  try {
    const response = await axiosInstance.post(`/friend/${String(id)}`);
    const data = oneFriendSchema.parse(response.data);
    return data
  } catch (error) {
    console.log(error)
    return rejectWithValue((error as Error).message);
  }
})

export const acceptFriendThunk = createAsyncThunk('friend/acceptFriendThunk', async(id: number, {rejectWithValue})=>{
  try {
    const response = await axiosInstance.put(`/friend/${String(id)}`);
    const data = oneFriendSchema.parse(response.data);
    return data
  } catch (error) {
    console.log(error)
    return rejectWithValue((error as Error).message);
  }
})

export const deleteFriendThunk = createAsyncThunk(
  'friend/deleteFriendThunk',
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

export const findFriendsThunk = createAsyncThunk('users/findFriendsThunk', async(search: string, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get(`/users?search=${search}`);
    const data = friendsSchema.parse(response.data);
    return data
  } catch (error) {
    console.log(error)
    return rejectWithValue((error as Error).message);
  }
})


export const getAllRequestsToMeThunk = createAsyncThunk('friend/getAllRequestsToMeThunk', async(_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get('/friend/requeststome');
    const data = receivesToFriendSchema.parse(response.data);
    return data.map((item) => item.Requester)
  } catch (error) {
    console.log(error)
    return rejectWithValue((error as Error).message);
  }
})

export const getAllMyRequestsThunk = createAsyncThunk('friend/getAllMyRequestsThunk', async(_, {rejectWithValue}) => {
  try {
    const response = await axiosInstance.get('/friend/myrequests');
    const data = receivefriendsSchema.parse(response.data);
    return data.map((item) => item.Receiver)
  } catch (error) {
    console.log(error)
    return rejectWithValue((error as Error).message);
  }
})
