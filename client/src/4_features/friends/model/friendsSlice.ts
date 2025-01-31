import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FriendsType } from '../types/types';
import { getAllFriends } from '../lib/friendsThunk';

type FriendsStateType = {
  friends: FriendsType;
  loading: boolean;
  error: null | string;
};

const initialState: FriendsStateType = {
  friends: [],
  loading: false,
  error: null,
};

export const friendsSlice = createSlice({
  name: 'friends',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
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
      });
  },
});


// Other code such as selectors can use the imported `RootState` type

export default friendsSlice.reducer;
