import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh",
        method: "GET",
        credentials: "include",
      }),
    }),
     getApplications: builder.query({
      query: () => ({
        url: "applications",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
  }),
});


export const { useRefreshTokenQuery, useGetApplicationsQuery } = apiSlice;