import { createSlice } from '@reduxjs/toolkit';

interface ModalEditProps {
  isOpen: boolean;
}

interface StateProps {
  modalAction: ModalEditProps;
}

const initialState = {
  isOpen: false,
};

const modalEditSlice = createSlice({
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

export const { setOpen, setClose } = modalEditSlice.actions;

export default modalEditSlice.reducer;
