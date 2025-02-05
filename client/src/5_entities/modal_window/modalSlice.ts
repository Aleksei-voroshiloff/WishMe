import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  showUserModal: boolean;
  showModal: boolean;
  avatar: string | null;
  showDate: boolean;
  tomorrowDate: boolean;
  showModalEdit: boolean;
  
};

const initialState: ModalState = {
  showUserModal: false,
  showModal: false,
  avatar: null,
  showDate: false,
  tomorrowDate: false,
  showModalEdit: false,
};

const modalSlice = createSlice({
  name: 'Modal',
  initialState,
  reducers: {
    openTomorrowDate(state) {
      state.tomorrowDate = true;
    },
    closeTomorrowDate(state) {
      state.tomorrowDate = false;
    },
    openDangerDate(state) {
      state.showDate = true;
    },
    closeDangerDate(state) {
      state.showDate = false;
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
      state.tomorrowDate = false;
      state.showDate = false;
    },
    openModal(state) {
      state.showModal = true;
    },

    closeModal(state) {
      state.showModal = false;
    },
  },
});

export const {
  openTomorrowDate,
  closeTomorrowDate,
  openUserModal,
  closeUserModal,
  setAvatar,
  openModal,
  closeModal,
  openDangerDate,
  closeDangerDate,
} = modalSlice.actions;
export default modalSlice.reducer;
