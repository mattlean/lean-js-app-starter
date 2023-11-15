import { Prisma } from '@prisma/client'
import { Types } from 'mongoose'
import request from 'supertest'

import app from '../../../../app'
import { prismaMock } from '../../../../common/util/test'
import {
    MOCK_REPLY,
    MOCK_THREAD_INCLUDES_REPLY,
    MOCK_THREAD_W_COMMENT,
    MOCK_THREAD_W_REPLY,
    MOCK_THREAD_W_SUBJECT_COMMENT,
} from './MOCK_DATA'

describe('create thread endpoint', () => {
    it('creates thread with comment when request payload only has comment', async () => {
        prismaMock.thread.create.mockResolvedValue(MOCK_THREAD_W_COMMENT)
        // Prisma typing is incorrect here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prismaMock.thread.aggregate.mockResolvedValue({ _count: 1 })

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
        // Prisma typing is incorrect here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prismaMock.thread.aggregate.mockResolvedValue({ _count: 1 })

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

describe('list threads endpoint', () => {
    it('returns all threads', async () => {
        const MOCK_THREAD_LIST = [
            MOCK_THREAD_W_COMMENT,
            MOCK_THREAD_W_SUBJECT_COMMENT,
        ]

        prismaMock.thread.aggregate.mockResolvedValue({
            // Prisma typing is incorrect here
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _count: MOCK_THREAD_LIST.length,
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prismaMock.thread.aggregateRaw.mockResolvedValue(MOCK_THREAD_LIST)

        expect.assertions(11)

        const res = await request(app).get('/api/v1/threads')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(res.body.data).toHaveLength(MOCK_THREAD_LIST.length)

        MOCK_THREAD_LIST.forEach((t, i) => {
            expect(t.id).toBe(res.body.data[i].id)
            expect(t.subject).toBe(res.body.data[i].subject)
            expect(t.comment).toBe(res.body.data[i].comment)
            expect(t.createdAt.getTime()).toBe(
                new Date(res.body.data[i].createdAt).getTime()
            )
        })
    })

    // TODO: test that each thread only show ups to 5 replies
})

describe('read thread endpoint', () => {
    it('returns thread', async () => {
        prismaMock.thread.findUniqueOrThrow.mockResolvedValue(
            MOCK_THREAD_W_SUBJECT_COMMENT
        )

        expect.assertions(5)

        const res = await request(app).get(
            `/api/v1/threads/${MOCK_THREAD_W_SUBJECT_COMMENT.id}`
        )

        expect(res.status).toBe(200)
        expect(MOCK_THREAD_W_SUBJECT_COMMENT.id).toBe(res.body.data.id)
        expect(MOCK_THREAD_W_SUBJECT_COMMENT.subject).toBe(
            res.body.data.subject
        )
        expect(MOCK_THREAD_W_SUBJECT_COMMENT.comment).toBe(
            res.body.data.comment
        )
        expect(MOCK_THREAD_W_SUBJECT_COMMENT.createdAt.getTime()).toBe(
            new Date(res.body.data.createdAt).getTime()
        )
    })

    // TODO: test that all replies are associated with the thread

    it('returns 404 when requesting a nonexistent thread', async () => {
        prismaMock.thread.findUniqueOrThrow.mockImplementation(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                'No thread found',
                {
                    clientVersion: '4.15.0',
                    code: 'P2025',
                }
            )
            throw err
        })

        expect.assertions(3)

        const res = await request(app).get(
            `/api/v1/threads/${new Types.ObjectId().toString()}`
        )

        expect(res.status).toBe(404)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Thread was not found.')
    })
})

describe('create reply endpoint', () => {
    it('creates reply for thread', async () => {
        prismaMock.thread.findUniqueOrThrow.mockResolvedValue(
            MOCK_THREAD_W_REPLY
        )

        const r = {
            ...MOCK_REPLY,
            thread: MOCK_THREAD_INCLUDES_REPLY,
        }
        prismaMock.reply.create.mockResolvedValue(r)

        expect.assertions(8)

        const res = await request(app)
            .post(`/api/v1/threads/${MOCK_THREAD_W_REPLY.id}/reply`)
            .send({ comment: MOCK_REPLY.comment })

        expect(res.status).toBe(201)
        expect(res.body.data.id).toBe(MOCK_THREAD_INCLUDES_REPLY.id)
        expect(res.body.data.comment).toBe(MOCK_THREAD_INCLUDES_REPLY.comment)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_THREAD_INCLUDES_REPLY.createdAt.getTime()
        )
        expect(Array.isArray(res.body.data.replies)).toBe(true)
        expect(res.body.data.replies[0].id).toBe(MOCK_REPLY.id)
        expect(res.body.data.replies[0].comment).toBe(MOCK_REPLY.comment)
        expect(new Date(res.body.data.replies[0].createdAt).getTime()).toBe(
            MOCK_REPLY.createdAt.getTime()
        )
    })

    it('returns 404 when creating a reply for nonexistent thread', async () => {
        prismaMock.thread.findUniqueOrThrow.mockImplementation(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                'No thread found',
                {
                    clientVersion: '4.15.0',
                    code: 'P2025',
                }
            )
            throw err
        })

        expect.assertions(3)

        const res = await request(app)
            .post(`/api/v1/threads/${new Types.ObjectId().toString()}/reply`)
            .send({ comment: MOCK_THREAD_W_REPLY.comment })

        expect(res.status).toBe(404)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Not found')
    })
})
