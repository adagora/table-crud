import { createSlice } from '@reduxjs/toolkit';

interface ModalActionProps {
  isOpen: boolean;
}

interface StateProps {
  modalAction: ModalActionProps;
}

const initialState = {
  isOpen: false,
};

const modalActionSlice = createSlice({
  name: 'modalAction',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setClose: () => initialState,
  },
});

export const selectOpen = (state: StateProps) => state.modalAction.isOpen;

export const { setOpen, setClose } = modalActionSlice.actions;

export default modalActionSlice.reducer;
