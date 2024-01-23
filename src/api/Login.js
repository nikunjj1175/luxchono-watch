import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LoginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "post",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `/verify-email`,
        method: "post",
        body,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `/verify-otp`,
        method: "post",
        body,
      }),
    }),
    Register: builder.mutation({
      query: (body) => ({
        url: `/register`,
        method: "post",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
  useRegisterMutation
} = LoginApi;
