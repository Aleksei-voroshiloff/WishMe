import {
  addWish,
  deleteWish,
  getPresInfo,
  getWish,
  toggleReservation,
  updateWish,
} from '../lib/wishThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { PresentObjType, WishObjectType, WishTypeArray } from '../types/types';

type NoteState = {
  wishCards: WishTypeArray;
  loading: boolean;
  error: null | string;
  reservations:  PresentObjType | null;
  wishCard: WishObjectType | null;
  showModalEdit: boolean;
  isBusy: boolean;
};

const initialState: NoteState = {
  wishCards: [],
  loading: false,
  error: null,
  reservations: null,
  wishCard: null,
  showModalEdit: false,
  isBusy: false,
};

const wishSlice = createSlice({
  name: 'wish1',
  initialState,
  reducers: {
    openEditModal(state, action: { payload: WishObjectType }) {
      state.showModalEdit = true;
      state.wishCard = action.payload;
    },
    closeEditModal(state) {
      state.showModalEdit = false;
    },
  },
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
        state.wishCards = state.wishCards.filter((wish) => wish.id !== payload);
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
        // console.log(payload, 'zzzzzzz');
        state.reservations = payload;
      })
      .addCase(toggleReservation.fulfilled, (state, { payload }) => {
        state.reservations = payload
        if( state.wishCards.some((wish) => wish.id === payload.wishId)) {
          state.isBusy = !state.isBusy
        } 

      });
  },
});
export const { openEditModal, closeEditModal } = wishSlice.actions;

export default wishSlice.reducer;
