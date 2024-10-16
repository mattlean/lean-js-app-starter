import { Prisma, Reply, Thread } from '@prisma/client'

type ThreadWithReplies = Prisma.ThreadGetPayload<{
    include: { replies: true }
}>

export const MOCK_THREAD_W_COMMENT: Thread = {
    id: '65200adeed075a6920b9129a',
    subject: null,
    comment: 'Thread that only has a comment!',
    createdAt: new Date('2023-10-06T13:25:50.369Z'),
}

export const MOCK_THREAD_W_SUBJECT_COMMENT: Thread = {
    id: '65211c569fea52d4ab5e9953',
    subject: 'Thread With Subject & Comment',
    comment: 'Thread with a subject and a comment!',
    createdAt: new Date('2023-10-07T08:52:38.337Z'),
}

export const MOCK_REPLY: Reply = {
    id: '6528fa813129c34de63826bf',
    comment: "The reply's comment!",
    createdAt: new Date('2023-10-13T08:06:25.380Z'),
    threadId: '6523e1bfc5c3617feb1e21ac',
}

export const MOCK_THREAD_W_REPLY: Thread = {
    id: '6523e1bfc5c3617feb1e21ac',
    subject: null,
    comment: 'Thread with a comment and a reply!',
    createdAt: new Date('2023-10-09T11:19:27.167Z'),
}

export const MOCK_THREAD_INCLUDES_REPLY: ThreadWithReplies = {
    ...MOCK_THREAD_W_REPLY,
    replies: [MOCK_REPLY],
}
