import { addWish, deleteWish, getPresInfo, getWish, updateWish } from '../lib/wishThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { PresentObjType, WishTypeArray } from '../types/types';

type NoteState = {
  wishCards: WishTypeArray;
  loading: boolean;
  error: null | string;
  reserv: PresentObjType[] | null;
};

const initialState: NoteState = {
  wishCards: [],
  loading: false,
  error: null,
  reserv: [],
};

const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWish.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishCards = payload;
      })
      .addCase(getWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWish.fulfilled, (state, action) => {
        state.loading = false;
        state.wishCards.push(action.payload);
      })
      .addCase(addWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWish.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishCards = state.wishCards.filter((book) => book.id !== payload);
      })
      .addCase(deleteWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateWish.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWish.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishCards = state.wishCards.map((wish) => (wish.id === payload.id ? payload : wish));
      })
      .addCase(updateWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPresInfo.fulfilled, (state, { payload }) => {
        console.log(payload, 'zzzzzzz');
        state.reserv?.push(payload);
        
      });
  },
});

export default wishSlice.reducer;
