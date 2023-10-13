import { Thread } from '@prisma/client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { APIRes } from './types'

export interface ThreadInput {
    subject?: string
    comment: string
}

const baseUrl =
    typeof window !== 'undefined' && // This line is needed to work on backend
    process.env.NODE_ENV === 'development' &&
    window.__DEV_SERVER__
        ? 'http://localhost:3000/api/v1'
        : '/api/v1'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Thread'],
    endpoints: (builder) => ({
        createThread: builder.mutation({
            query: (newThread: ThreadInput) => ({
                url: '/threads',
                method: 'POST',
                body: newThread,
            }),
            invalidatesTags: ['Thread'],
        }),

        getThread: builder.query({
            query: (threadId) => `/threads/${threadId}`,
        }),

        getThreads: builder.query<APIRes<Thread>, void>({
            query: () => '/threads',
            providesTags: ['Thread'],
        }),
    }),
})

export const apiMiddleware = apiSlice.middleware

export const apiReducer = apiSlice.reducer

export const apiReducerPath = apiSlice.reducerPath

export const {
    useGetThreadQuery,
    useGetThreadsQuery,
    useCreateThreadMutation,
} = apiSlice
