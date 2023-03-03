import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
}

export const usrApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query<User[], any>({
        query: () => '/users',
      }),
    };
  },
});

export const { useFetchUsersQuery } = usrApiSlice;
