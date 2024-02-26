import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ReplyResData, ThreadResData } from '../../common/types'
import { APIRes } from './types'

export interface ThreadInput {
    subject?: ThreadResData['subject']
    comment: ThreadResData['comment']
}

export interface ReplyInput {
    comment: ReplyResData['comment']
}

const API_PATH = '/api/v1'

if (!process.env.HOST_API) {
    throw new Error('🔴 API host was not set')
}

const baseUrl =
    process.env.HOST_API === '/'
        ? API_PATH
        : `${process.env.HOST_API}${API_PATH}`

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Thread'],
    endpoints: (builder) => ({
        createReply: builder.mutation<
            APIRes<ThreadResData>,
            {
                threadId: ThreadResData['id'] | void
                comment: ReplyInput['comment']
            }
        >({
            query: ({
                threadId,
                ...newReply
            }: {
                threadId: ThreadResData['id']
                comment: ReplyInput['comment']
            }) => {
                if (!threadId) {
                    throw new Error('No thread ID found.')
                }

                return {
                    url: `/threads/${threadId}/reply`,
                    method: 'POST',
                    body: newReply,
                }
            },
            invalidatesTags: ['Thread'],
        }),

        createThread: builder.mutation<APIRes<ThreadResData>, ThreadInput>({
            query: (newThread) => ({
                url: '/threads',
                method: 'POST',
                body: newThread,
            }),
            invalidatesTags: ['Thread'],
        }),

        getThread: builder.query<
            APIRes<ThreadResData>,
            ThreadResData['id'] | void
        >({
            query: (threadId) => {
                if (!threadId) {
                    throw new Error('No thread ID found.')
                }

                return `/threads/${threadId}`
            },
            providesTags: ['Thread'],
        }),

        getThreads: builder.query<APIRes<ThreadResData[]>, number>({
            query: (page) => ({
                url: '/threads',
                method: 'GET',
                params: { page },
            }),
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
    useCreateReplyMutation,
    useCreateThreadMutation,
} = apiSlice
