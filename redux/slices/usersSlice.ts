import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
    selectedUserId: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    editUser: (state, action) => {
      state.users = state.users.map(user => (user.id === action.payload.id ? action.payload : user));
    },
  },
});

export const { setUsers, addUser, deleteUser, setSelectedUserId, editUser } = usersSlice.actions;
export default usersSlice.reducer;
