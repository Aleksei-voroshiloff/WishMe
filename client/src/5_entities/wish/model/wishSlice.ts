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
  isLoading: boolean;
  reservations: Record<number, PresentObjType | null>;
  wishCard: WishObjectType | null;
  showModalEdit: boolean;
};

const initialState: NoteState = {
  wishCards: [],
  loading: false,
  error: null,
  reservations: {},
  isLoading: false,
  wishCard: null,
  showModalEdit: false,
};

const wishSlice = createSlice({
  name: 'wish1',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    openEditModal(state,  action: { payload: WishObjectType }) {
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
        state.reservations[payload.id] = payload;
      })
      .addCase(toggleReservation.fulfilled, (state, { payload }) => {
        const x = payload?.id;
        if (payload) {
          state.reservations[x] = payload;
        } else {
          const { [x]: _, ...rest } = state.reservations;
          state.reservations = rest;
        }
      });
  },
});
export const { setIsLoading, openEditModal, closeEditModal } = wishSlice.actions;

export default wishSlice.reducer;
