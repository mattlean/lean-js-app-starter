import { Thread } from '@prisma/client'
import request from 'supertest'

import app from '../../../../app'
import { prismaMock } from '../../../../util/test'

const MOCK_THREAD_W_COMMENT: Thread = {
    id: '65200adeed075a6920b9129a',
    subject: null,
    comment: 'Thread with only comment!',
    createdAt: new Date('2023-10-06T13:25:50.369Z'),
}

const MOCK_THREAD_W_SUBJECT_COMMENT: Thread = {
    id: '65211c569fea52d4ab5e9953',
    subject: 'Thread With Subject & Comment',
    comment: 'Thread with subject and content!',
    createdAt: new Date('2023-10-07T08:52:38.337Z'),
}

describe('create thread endpoint', () => {
    it('creates thread with comment when request payload only has comment', async () => {
        prismaMock.thread.create.mockResolvedValue(MOCK_THREAD_W_COMMENT)

        expect.assertions(4)

        const res = await request(app)
            .post('/api/v1/threads')
            .send({ comment: MOCK_THREAD_W_COMMENT.comment })

        expect(res.status).toBe(201)
        expect(res.body.data.id).toBe(MOCK_THREAD_W_COMMENT.id)
        expect(res.body.data.comment).toBe(MOCK_THREAD_W_COMMENT.comment)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_THREAD_W_COMMENT.createdAt.getTime()
        )
    })

    it('creates thread with subject & comment when request payload has subject & comment', async () => {
        prismaMock.thread.create.mockResolvedValue(
            MOCK_THREAD_W_SUBJECT_COMMENT
        )

        expect.assertions(5)

        const res = await request(app).post('/api/v1/threads').send({
            subject: MOCK_THREAD_W_SUBJECT_COMMENT.subject,
            comment: MOCK_THREAD_W_SUBJECT_COMMENT.comment,
        })

        expect(res.status).toBe(201)
        expect(res.body.data.id).toBe(MOCK_THREAD_W_SUBJECT_COMMENT.id)
        expect(res.body.data.subject).toBe(
            MOCK_THREAD_W_SUBJECT_COMMENT.subject
        )
        expect(res.body.data.comment).toBe(
            MOCK_THREAD_W_SUBJECT_COMMENT.comment
        )
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_THREAD_W_SUBJECT_COMMENT.createdAt.getTime()
        )
    })
})
