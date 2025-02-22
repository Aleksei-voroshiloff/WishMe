import {
  addWishList,
  deleteWishList,
  getFriendWishListThunk,
  getOneWishList,
  getWishList,
  updateWishList,
} from '../lib/wishListThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { WishListObjectType, WishListTypeArray } from '../types/types';

type WishListState = {
  wishListCards: WishListTypeArray;
  loading: boolean;
  error: null | string;
  oneWishList: WishListObjectType | null;
  showModalEditList: boolean;
};

const initialState: WishListState = {
  wishListCards: [],
  loading: false,
  error: null,
  oneWishList: null,
  showModalEditList: false,
};

const wishListSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    openEditListModal(state, action: { payload: WishListObjectType }) {
      state.showModalEditList = true;
      state.oneWishList = action.payload;
    },
    closeEditListModal(state) {
      state.showModalEditList = false;
    },
  },
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
        console.log('WishList added:', action.payload);
        state.wishListCards.unshift(action.payload);
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
        state.wishListCards = state.wishListCards.filter((list) => list.id !== payload);
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
      .addCase(getOneWishList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.oneWishList = payload;
      })
      .addCase(getOneWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFriendWishListThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriendWishListThunk.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.wishListCards = payload;
      })
      .addCase(getFriendWishListThunk.rejected, (state, action) => {
        state.wishListCards = [];
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { openEditListModal, closeEditListModal } = wishListSlice.actions;

export default wishListSlice.reducer;
