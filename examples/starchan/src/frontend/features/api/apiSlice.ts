import { Reply } from '@prisma/client'
import { Thread } from '@prisma/client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ThreadWithReplies } from '../../common/types'
import { APIRes } from './types'

export interface ThreadInput {
    subject?: ThreadWithReplies['subject']
    comment: ThreadWithReplies['comment']
}

export interface ReplyInput {
    comment: Reply['comment']
}

const baseUrl =
    process.env.__EXPRESS_SERVER__ ||
    process.env.NODE_ENV === 'test' ||
    (process.env.NODE_ENV === 'development' &&
        typeof window === 'object' &&
        window.__DEV_SERVER__)
        ? 'http://localhost:3000/api/v1'
        : '/api/v1'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Thread'],
    endpoints: (builder) => ({
        createReply: builder.mutation<
            APIRes<ThreadWithReplies>,
            {
                threadId: ThreadWithReplies['id'] | void
                comment: ReplyInput['comment']
            }
        >({
            query: ({
                threadId,
                ...newReply
            }: {
                threadId: ThreadWithReplies['id']
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

        createThread: builder.mutation<APIRes<Thread>, ThreadInput>({
            query: (newThread) => ({
                url: '/threads',
                method: 'POST',
                body: newThread,
            }),
            invalidatesTags: ['Thread'],
        }),

        getThread: builder.query<
            APIRes<ThreadWithReplies>,
            ThreadWithReplies['id'] | void
        >({
            query: (threadId) => {
                if (!threadId) {
                    throw new Error('No thread ID found.')
                }

                return `/threads/${threadId}`
            },
            providesTags: ['Thread'],
        }),

        getThreads: builder.query<APIRes<ThreadWithReplies[]>, number>({
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
