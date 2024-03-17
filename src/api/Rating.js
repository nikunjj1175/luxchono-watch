import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prepareHeaders } from "./Utils";

export const LoginApi = createApi({
  reducerPath: "ratingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    rating: builder.mutation({
      query: (body) => ({
        url: "/rating",
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
    useRatingMutation
} = LoginApi;
