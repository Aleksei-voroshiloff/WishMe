import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FriendsType } from '../types/types';
import { deleteFriendThunk, findFriendsThunk, getAllFriends } from '../lib/friendsThunk';

type FriendsStateType = {
  friends: FriendsType;
  loading: boolean;
  error: null | string;
  foundFriends: FriendsType;
  foundFriendsLoading: boolean;
  modalShow: boolean;
  search: string;
};

const initialState: FriendsStateType = {
  friends: [],
  loading: false,
  error: null,
  foundFriends: [],
  foundFriendsLoading: false,
  modalShow: false,
  search: '',
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    openWindow(state) {
      state.modalShow = true;
    },
    closeWindow(state) {
      state.modalShow = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriends.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFriends.fulfilled, (state, action: PayloadAction<FriendsType>) => {
        state.loading = false;
        state.friends = action.payload;
      })
      .addCase(getAllFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFriendThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFriendThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = state.friends.filter(friend => friend.id !== action.payload);
      })
      .addCase(deleteFriendThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(findFriendsThunk.pending, (state) => {
        state.foundFriendsLoading = true;
        state.error = null;
      })
      .addCase(findFriendsThunk.fulfilled, (state, action: PayloadAction<FriendsType>) => {
        state.foundFriendsLoading = false;
        state.foundFriends = action.payload;
      })
      .addCase(findFriendsThunk.rejected, (state, action) => {
        state.foundFriendsLoading = false;
        state.error = action.payload as string;
      })
  },
});


// Other code such as selectors can use the imported `RootState` type
export const { openWindow, closeWindow, setSearch } = friendsSlice.actions;

export default friendsSlice.reducer;
