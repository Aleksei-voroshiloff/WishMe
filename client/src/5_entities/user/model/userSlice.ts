import { createSlice } from '@reduxjs/toolkit';
import type { UserState } from '../types/types';
import {
  fetchUser,
  submitHandler,
  loginHandler,
  logoutHandler,
  getOneUser,
  updateUserInfo,
} from '../lib/userThunks';

const initialState: UserState = {
  status: 'loading',
  data: null,
  error: null,
  oneUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log(action)
        state.data = action.payload.user;
        state.status = 'logged';
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.data = null;
        state.status = 'guest';
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(submitHandler.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'logged';
        state.error = null;
      })
      .addCase(submitHandler.rejected, (state, action) => {
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.status = 'logged';
        state.error = null;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(logoutHandler.fulfilled, (state) => {
        state.data = null;
        state.status = 'guest';
        state.error = null;
      })
      .addCase(logoutHandler.rejected, (state, action) => {
        state.error = action.error.message ?? 'Something went wrong';
      })
      .addCase(getOneUser.fulfilled, (state, { payload }) => {
        state.oneUser = payload;
      })
      .addCase(getOneUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Что то не так при загрузке юзера';
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.oneUser = payload;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.error = action.error.message ?? 'Что то не так при обновлении';
      });
  },
});

export default userSlice.reducer;
