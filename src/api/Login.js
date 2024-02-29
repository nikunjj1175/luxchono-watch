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
    ForgotPassword: builder.mutation({
      query: (body) => ({
        url: '/forgot-password',
        method: 'post',
        body,
      }),
    }),
    ResetPassword: builder.mutation({
      query: ({ id, newPassword }) => ({

          url: `/reset-password?id=${id || "-"}`,
          method: 'post',
          body: { newPassword },
      }),
  }),
  }),
});

export const {
  useLoginMutation,
  useVerifyEmailMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = LoginApi;
