import { apiSlice } from "../api/apiSlice";
import {  getUsers, getFriends, getRequests } from "./usersSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "users",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            getUsers({
              users: result.data
            })
          );
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    getFriends: builder.query({
      query: () => ({
        url: "friends",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            getFriends({
              friends: result.data
            })
          );
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    getRequests: builder.query({
      query: () => ({
        url: "friends/requests",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            getRequests({
              requests: result.data
            })
          );
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    removeFriend: builder.mutation({
      query: ({ targetId }) => ({
        url: "friends/remove",
        method: "POST",
        body: {
          targetId,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    sendRequest: builder.mutation({
      query: ({ targetId }) => ({
        url: "friends/requests/send",
        method: "POST",
        body: {
          targetId,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    cancelRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: "friends/requests/cancel",
        method: "POST",
        body: {
          requestId,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    acceptRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: "friends/requests/accept",
        method: "POST",
        body: {
          requestId,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
    rejectRequest: builder.mutation({
      query: ({ requestId }) => ({
        url: "friends/requests/reject",
        method: "POST",
        body: {
          requestId,
        },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
        } catch ({ error }) {
          if(error) console.log(error);
        }
      },
    }),
  }),
  
});

export const {
    useGetUsersQuery,
    useGetFriendsQuery,
    useGetRequestsQuery,
    useSendRequestMutation,
    useRemoveFriendMutation,
    useCancelRequestMutation,
    useAcceptRequestMutation,
    useRejectRequestMutation
} = usersApi;
