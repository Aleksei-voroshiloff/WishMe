import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { FriendsType, OneFriendType } from '../types/types';
import {
  acceptFriendThunk,
  addFriendThunk,
  deleteFriendThunk,
  findFriendsThunk,
  getAllFriends,
  getAllMyRequestsThunk,
  getAllRequestsToMeThunk,
} from '../lib/friendsThunk';

type FriendsStateType = {
  friends: FriendsType;
  loading: boolean;
  error: null | string;
  foundFriends: FriendsType;
  foundFriendsLoading: boolean;
  modalShow: boolean;
  search: string;
  requestsToMe: FriendsType;
  requestsToMeLoading: boolean;
  myRequests: FriendsType;
  myRequestsLoading: boolean;
  myRequestsError: string | null;
  showDeleteModal: boolean;
  selectedFriend: OneFriendType | null;
};

const initialState: FriendsStateType = {
  friends: [],
  loading: false,
  error: null,
  foundFriends: [],
  foundFriendsLoading: false,
  modalShow: false,
  search: '',
  requestsToMe: [],
  requestsToMeLoading: false,
  myRequests: [],
  myRequestsLoading: false,
  myRequestsError: null,
  showDeleteModal: false,
  selectedFriend: null,
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
    unhideDeleteModal(state, action: PayloadAction<OneFriendType>) {
      state.showDeleteModal = true;
      state.selectedFriend = action.payload
    },
    hideDeleteModal(state) {
      state.showDeleteModal = false;
      state.selectedFriend = null;
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
        state.friends = state.friends.filter((friend) => friend.id !== action.payload);
        state.requestsToMe = state.requestsToMe.filter(
          (requestToMe) => requestToMe.id !== action.payload,
        );
        state.myRequests = state.myRequests.filter((myRequest) => myRequest.id !== action.payload);
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
      .addCase(addFriendThunk.pending, (state) => {
        state.myRequestsLoading = true;
        state.error = null;
      })
      .addCase(addFriendThunk.fulfilled, (state, action: PayloadAction<OneFriendType>) => {
        state.myRequestsLoading = false;
        state.myRequests.unshift(action.payload);
        state.myRequestsError = null;
      })
      .addCase(addFriendThunk.rejected, (state, action) => {
        state.myRequestsLoading = false;
        state.myRequestsError = action.error as string;
      })
      .addCase(acceptFriendThunk.pending, (state) => {
        state.requestsToMeLoading = true;
        state.loading = true;
        state.myRequestsError = null;
      })
      .addCase(acceptFriendThunk.fulfilled, (state, action: PayloadAction<OneFriendType>) => {
        state.loading = false;
        state.requestsToMeLoading = false;
        state.friends.unshift(action.payload);
        state.requestsToMe = state.requestsToMe.filter(
          (requestToMe) => requestToMe.id !== action.payload.id,
        );
      })
      .addCase(acceptFriendThunk.rejected, (state, action) => {
        state.loading = false;
        state.requestsToMeLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllMyRequestsThunk.pending, (state) => {
        state.myRequestsLoading = true;
        state.error = null;
      })
      .addCase(getAllMyRequestsThunk.fulfilled, (state, action: PayloadAction<FriendsType>) => {
        state.myRequestsLoading = false;
        state.myRequests = action.payload;
      })
      .addCase(getAllMyRequestsThunk.rejected, (state, action) => {
        state.myRequestsLoading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllRequestsToMeThunk.pending, (state) => {
        state.requestsToMeLoading = true;
        state.error = null;
      })
      .addCase(getAllRequestsToMeThunk.fulfilled, (state, action: PayloadAction<FriendsType>) => {
        state.requestsToMeLoading = false;
        state.requestsToMe = action.payload;
      })
      .addCase(getAllRequestsToMeThunk.rejected, (state, action) => {
        state.requestsToMeLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  openWindow,
  closeWindow,
  setSearch,
  unhideDeleteModal,
  hideDeleteModal,
} = friendsSlice.actions;

export default friendsSlice.reducer;
