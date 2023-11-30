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
import MOCK_FULL_THREAD_LIST from './MOCK_FULL_THREAD_LIST.json'

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

    it('deletes a thread when creating a thread while the threads list is full', async () => {
        prismaMock.thread.create.mockResolvedValue(MOCK_THREAD_W_COMMENT)
        prismaMock.thread.aggregate.mockResolvedValue({
            // Prisma typing is incorrect here
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _count: MOCK_FULL_THREAD_LIST.length + 1,
        })
        // Prisma typing is incorrect here
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        prismaMock.thread.aggregateRaw.mockResolvedValue([
            MOCK_FULL_THREAD_LIST[0],
        ])
        prismaMock.thread.delete.mockResolvedValue({
            ...MOCK_FULL_THREAD_LIST[0],
            createdAt: new Date(MOCK_FULL_THREAD_LIST[0].createdAt),
        })

        expect.assertions(5)

        const res = await request(app)
            .post('/api/v1/threads')
            .send({ comment: MOCK_THREAD_W_COMMENT.comment })

        expect(res.status).toBe(201)
        expect(res.body.data.id).toBe(MOCK_THREAD_W_COMMENT.id)
        expect(res.body.data.comment).toBe(MOCK_THREAD_W_COMMENT.comment)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_THREAD_W_COMMENT.createdAt.getTime()
        )
        expect(prismaMock.thread.delete).toHaveBeenCalled()
    })
})

describe('list threads endpoint', () => {
    it('returns all threads when no query string parameters are received', async () => {
        const MOCK_THREAD_LIST = [
            MOCK_THREAD_W_SUBJECT_COMMENT,
            MOCK_THREAD_W_COMMENT,
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

        expect.assertions(12)

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

        expect(res.body.info.threadCount).toBe(2)
    })

    it('returns a thread page when a page query string parameter is received', async () => {
        prismaMock.thread.aggregate.mockResolvedValue({
            // Prisma typing is incorrect here
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _count: MOCK_FULL_THREAD_LIST.length,
        })

        // The ordering of the threads here may not match ordering in the
        // live build. Due to the nature of mocking, replicating the exact
        // order is unnecessary. We still test to make sure that the code
        // flows correctly though.
        prismaMock.thread.aggregateRaw.mockResolvedValue(
            // Prisma typing is incorrect here
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            MOCK_FULL_THREAD_LIST.slice(0, 20)
        )

        expect.assertions(86)

        const res = await request(app).get('/api/v1/threads?page=1')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(res.body.data).toHaveLength(20)

        for (let i = 0; i < 20; ++i) {
            const t = MOCK_FULL_THREAD_LIST[i]

            expect(t.id).toBe(res.body.data[i].id)
            expect(t.subject).toBe(res.body.data[i].subject)
            expect(t.comment).toBe(res.body.data[i].comment)
            expect(t.createdAt).toBe(res.body.data[i].createdAt)
        }

        expect(res.body.info.totalPages).toBe(10)
        expect(res.body.info.hasNextPage).toBe(true)
        expect(res.body.info.hasPreviousPage).toBe(false)
    })

    it('avoids an unnecessary DB query when the list of threads is empty', async () => {
        prismaMock.thread.aggregate.mockResolvedValue({
            // Prisma typing is incorrect here
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            _count: 0,
        })

        expect.assertions(7)

        const res = await request(app).get('/api/v1/threads?page=1')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(res.body.data).toHaveLength(0)
        expect(prismaMock.thread.aggregateRaw).toHaveBeenCalledTimes(0)
        expect(res.body.info.totalPages).toBe(0)
        expect(res.body.info.hasNextPage).toBe(false)
        expect(res.body.info.hasPreviousPage).toBe(false)
    })
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
