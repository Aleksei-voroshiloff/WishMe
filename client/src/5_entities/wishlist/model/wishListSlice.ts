import { addWishList, deleteWishList, getOneWishList, getWishList, updateWishList } from '../lib/wishListThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { WishListObjectType, WishListTypeArray } from '../types/types';

type WishListState = {
  wishListCards: WishListTypeArray;
  loading: boolean;
  error: null | string;
  oneWishList: WishListObjectType | null;
};

const initialState: WishListState = {
  wishListCards: [],
  loading: false,
  error: null,
  oneWishList: null,
};

const wishListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishListCards = payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishListCards.push(action.payload);
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWishList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishListCards = state.wishListCards.filter((book) => book.id !== payload);
      })
      .addCase(deleteWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWishList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishListCards = state.wishListCards.map((list) =>
          list.id === payload.id ? payload : list,
        );
      })
      .addCase(updateWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getOneWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOneWishList.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.oneWishList = payload;
      })
      .addCase(getOneWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default wishListSlice.reducer;
