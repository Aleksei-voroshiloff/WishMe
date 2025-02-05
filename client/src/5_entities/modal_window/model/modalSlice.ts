import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  showUserModal: boolean;
  showModal: boolean;
  avatar: string | null;
  showDate: boolean;
  tomorrowDate: boolean;
};

const initialState: ModalState = {
  showUserModal: false,
  showModal: false,
  avatar: null,
  showDate: false,
  tomorrowDate: false,
};

const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    setTomorrowDate(state) {
      state.tomorrowDate = !state.tomorrowDate;
    },
    setShowDate(state) {
      state.showDate = !state.showDate;
    },
    setAvatar(state, action: { payload: string }) {
      state.avatar = action.payload;
    },
    openUserModal(state) {
      state.showUserModal = true;
    },
    closeUserModal(state) {
      state.showUserModal = false;
      state.avatar = null;
    },
    openModal(state) {
      state.showModal = true;
    },

    closeModal(state) {
      state.showModal = false;
    },
  },
});

export const {setTomorrowDate, openUserModal, closeUserModal, setAvatar, openModal, closeModal, setShowDate } =
  modalSlice.actions;
export default modalSlice.reducer;
