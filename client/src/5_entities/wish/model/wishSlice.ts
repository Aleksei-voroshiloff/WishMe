import {
  addWish,
  deleteReservation,
  deleteWish,
  getPresInfo,
  getWish,
  postReservation,
  updateWish,
} from '../lib/wishThunk';
import { createSlice } from '@reduxjs/toolkit';
import type { WishObjectType, WishTypeArray } from '../types/types';

type NoteState = {
  wishCards: WishTypeArray;
  loading: boolean;
  error: null | string;
  reservations: boolean;
  allReservations: Record<number, boolean >;
  wishCard: WishObjectType | null;
  showModalEdit: boolean;
  isBusy: boolean;
};

const initialState: NoteState = {
  wishCards: [],
  loading: false,
  error: null,
  reservations: false,
  wishCard: null,
  showModalEdit: false,
  isBusy: false,
  allReservations: {},
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
      .addCase(getPresInfo.fulfilled, (state, { payload, meta }) => {
        // console.log(payload, 'zzzzzzz');
        // console.log(meta, 'rrrrrrrrrrrrr');
        
        const wishId = meta.arg;
        state.allReservations[wishId] = payload
        // console.log(state.allReservations, 'zzzzz');
        
      })
      .addCase(postReservation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReservation.fulfilled, (state) => {
        state.loading = false;
        state.error = null;     
      })
      .addCase(deleteReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string
      });
  },
});
export const { openEditModal, closeEditModal } = wishSlice.actions;

export default wishSlice.reducer;
