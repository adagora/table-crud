import { configureStore } from '@reduxjs/toolkit';

import modalTransactionReducer from 'redux/slices/modalTransaction';
import modalActionReducer from 'redux/slices/modalAction';
import modalEditReducer from 'redux/slices/modalEdit';
import themeReducer from 'redux/slices/theme';
import usersReducer from './slices/usersSlice';
import { usrApiSlice } from './features/users/usersApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    [usrApiSlice.reducerPath]: usrApiSlice.reducer,
    theme: themeReducer,
    modalTransaction: modalTransactionReducer,
    modalAction: modalActionReducer,
    modalEdit: modalEditReducer,
  },
  devTools: process.env.MODE !== 'production',
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usrApiSlice.middleware),
});

export type Store = ReturnType<typeof store.getState>;

export default store;
