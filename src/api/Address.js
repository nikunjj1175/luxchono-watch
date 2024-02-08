import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { prepareHeaders } from './Utils';

export const AddressApi = createApi({
    reducerPath: 'AddressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: prepareHeaders,

    }),
    tagTypes: ['Address'],
    endpoints: (builder) => ({

        AddAddress: builder.mutation({
            query: (body) => {
                return {
                    url: "/address",
                    method: "post",
                    body,
                }
            },
            invalidatesTags: ['Address'],
        }),



    }),
});

export const { useAddAddressMutation } = AddressApi;