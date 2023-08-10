import { Prisma } from '@prisma/client'
import request from 'supertest'

import app from '../../../app'
import { protectMiddleware } from '../../../core/auth'
import {
    genProtectMiddlewareAuthImpl,
    prismaMock,
    restoreProtectMiddlewareImpl,
} from '../../../util/test'
import {
    MOCK_NOTE_EMPTY,
    MOCK_NOTE_W_CONTENT,
    MOCK_NOTE_W_TITLE,
    MOCK_NOTE_W_TITLE_CONTENT,
    MOCK_REQ_USER,
} from './MOCK_DATA'

jest.mock('../../../core/auth')

const protectMiddlewareMock = jest.mocked(protectMiddleware)

describe('create note endpoint', () => {
    beforeEach(() => protectMiddlewareMock.mockReset())

    it('creates an empty note when request payload is empty after being authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.create.mockResolvedValue(MOCK_NOTE_EMPTY)

        expect.assertions(6)

        const res = await request(app).post('/api/v1/notes')

        expect(res.status).toBe(201)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_EMPTY.uuid)
        expect(res.body.data.title).toBe(null)
        expect(res.body.data.content).toBe(null)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_EMPTY.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            MOCK_NOTE_EMPTY.updatedAt.getTime()
        )
    })

    it('creates note with title when request payload only has title after being authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.create.mockResolvedValue(MOCK_NOTE_W_TITLE)

        expect.assertions(6)

        const res = await request(app).post('/api/v1/notes')

        expect(res.status).toBe(201)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_W_TITLE.title)
        expect(res.body.data.content).toBe(MOCK_NOTE_W_TITLE.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE.updatedAt.getTime()
        )
    })

    it('creates note with content when request payload only has content after being authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.create.mockResolvedValue(MOCK_NOTE_W_CONTENT)

        expect.assertions(6)

        const res = await request(app).post('/api/v1/notes')

        expect(res.status).toBe(201)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_CONTENT.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_W_CONTENT.title)
        expect(res.body.data.content).toBe(MOCK_NOTE_W_CONTENT.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            MOCK_NOTE_W_CONTENT.updatedAt.getTime()
        )
    })

    it('creates note with title & content when request payload only has title & content after being authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.create.mockResolvedValue(MOCK_NOTE_W_TITLE_CONTENT)

        expect.assertions(6)

        const res = await request(app).post('/api/v1/notes')

        expect(res.status).toBe(201)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_W_TITLE_CONTENT.title)
        expect(res.body.data.content).toBe(MOCK_NOTE_W_TITLE_CONTENT.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.updatedAt.getTime()
        )
    })

    it('returns 401 when unauthorized', async () => {
        protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

        expect.assertions(3)

        const res = await request(app).post('/api/v1/notes')

        expect(res.status).toBe(401)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Unauthorized')
    })
})

describe('read note endpoint', () => {
    it('returns note when requesting an owned note', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.findUniqueOrThrow.mockResolvedValue(MOCK_NOTE_EMPTY)

        expect.assertions(6)

        const res = await request(app).get(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_EMPTY.uuid)
        expect(res.body.data.title).toBe(null)
        expect(res.body.data.content).toBe(null)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_EMPTY.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            MOCK_NOTE_EMPTY.updatedAt.getTime()
        )
    })

    it('returns 404 when requesting an inaccessible note', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.findUniqueOrThrow.mockImplementation(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                'No note found',
                {
                    clientVersion: '4.15.0',
                    code: 'P2025',
                }
            )
            throw err
        })

        expect.assertions(3)

        const res = await request(app).get(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(404)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Not found')
    })

    it('returns 401 when unauthorized', async () => {
        protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

        expect.assertions(3)

        const res = await request(app).get(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(401)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Unauthorized')
    })
})

describe('list notes endpoint', () => {
    it('returns owned notes for authorized user', async () => {
        const MOCK_NOTE_LIST = [
            MOCK_NOTE_EMPTY,
            MOCK_NOTE_W_TITLE,
            MOCK_NOTE_W_CONTENT,
            MOCK_NOTE_W_TITLE_CONTENT,
        ]
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.findMany.mockResolvedValue(MOCK_NOTE_LIST)

        expect.assertions(23)

        const res = await request(app).get('/api/v1/notes')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(res.body.data).toHaveLength(MOCK_NOTE_LIST.length)

        MOCK_NOTE_LIST.forEach((n, i) => {
            expect(n.uuid).toBe(res.body.data[i].uuid)
            expect(n.title).toBe(res.body.data[i].title)
            expect(n.content).toBe(res.body.data[i].content)
            expect(n.createdAt.getTime()).toBe(
                new Date(res.body.data[i].createdAt).getTime()
            )
            expect(n.updatedAt.getTime()).toBe(
                new Date(res.body.data[i].updatedAt).getTime()
            )
        })
    })

    it('returns empty list of notes for authorized user if they do not own any notes', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.findMany.mockResolvedValue([])

        expect.assertions(3)

        const res = await request(app).get('/api/v1/notes')

        expect(res.status).toBe(200)
        expect(Array.isArray(res.body.data)).toBe(true)
        expect(res.body.data).toHaveLength(0)
    })

    it('returns 401 when unauthorized', async () => {
        protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

        expect.assertions(3)

        const res = await request(app).get('/api/v1/notes')

        expect(res.status).toBe(401)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Unauthorized')
    })
})

describe('update note endpoint', () => {
    const UPDATED_TITLE = 'Updated Title'
    const UPDATED_CONTENT = 'Updated content!'
    const NEW_UPDATED_AT = new Date()

    it('returns note with updated title when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: UPDATED_TITLE,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .put(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({
                title: UPDATED_TITLE,
                content: MOCK_NOTE_W_TITLE_CONTENT.content,
            })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(UPDATED_TITLE)
        expect(res.body.data.content).toBe(MOCK_NOTE_W_TITLE_CONTENT.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with updated content when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            content: UPDATED_CONTENT,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .put(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({
                title: MOCK_NOTE_W_TITLE_CONTENT.title,
                content: UPDATED_CONTENT,
            })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_W_TITLE_CONTENT.title)
        expect(res.body.data.content).toBe(UPDATED_CONTENT)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with updated title & content when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: UPDATED_TITLE,
            content: UPDATED_CONTENT,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .put(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({
                title: UPDATED_TITLE,
                content: UPDATED_CONTENT,
            })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(UPDATED_TITLE)
        expect(res.body.data.content).toBe(UPDATED_CONTENT)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with null title when title is excluded when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: null,
            content: UPDATED_CONTENT,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .put(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({ content: UPDATED_CONTENT })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(null)
        expect(res.body.data.content).toBe(UPDATED_CONTENT)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with null content when content is excluded when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: UPDATED_TITLE,
            content: null,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .put(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({ title: UPDATED_TITLE })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(UPDATED_TITLE)
        expect(res.body.data.content).toBe(null)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with null title & content when request payload is empty when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: null,
            content: null,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app).put(
            `/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`
        )

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(null)
        expect(res.body.data.content).toBe(null)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns 404 when updating an inaccessible note when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockImplementation(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                '\nInvalid `prisma.note.update()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to update not found.',
                {
                    clientVersion: '4.15.0',
                    code: 'P2025',
                    meta: { cause: 'Record to update not found.' },
                }
            )
            throw err
        })

        expect.assertions(3)

        const res = await request(app)
            .put(`/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`)
            .send({ content: UPDATED_CONTENT })

        expect(res.status).toBe(404)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Not found')
    })

    it('returns 401 when unauthorized', async () => {
        protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

        expect.assertions(3)

        const res = await request(app).put(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(401)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Unauthorized')
    })
})

describe('patch note endpoint', () => {
    const PATCHED_TITLE = 'Patched Title'
    const PATCHED_CONTENT = 'Patched content!'
    const NEW_UPDATED_AT = new Date()

    it('returns note with patched title when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: PATCHED_TITLE,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .patch(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({
                title: PATCHED_TITLE,
            })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(PATCHED_TITLE)
        expect(res.body.data.content).toBe(MOCK_NOTE_W_TITLE_CONTENT.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with patched content when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            content: PATCHED_CONTENT,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .patch(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({
                content: PATCHED_CONTENT,
            })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_W_TITLE_CONTENT.title)
        expect(res.body.data.content).toBe(PATCHED_CONTENT)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with patched title & content when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            title: PATCHED_TITLE,
            content: PATCHED_CONTENT,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app)
            .patch(`/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`)
            .send({
                title: PATCHED_TITLE,
                content: PATCHED_CONTENT,
            })

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(PATCHED_TITLE)
        expect(res.body.data.content).toBe(PATCHED_CONTENT)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns note with same title & content when request payload is empty when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockResolvedValue({
            ...MOCK_NOTE_W_TITLE_CONTENT,
            updatedAt: NEW_UPDATED_AT,
        })

        expect.assertions(6)

        const res = await request(app).patch(
            `/api/v1/notes/${MOCK_NOTE_W_TITLE_CONTENT.uuid}`
        )

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_W_TITLE_CONTENT.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_W_TITLE_CONTENT.title)
        expect(res.body.data.content).toBe(MOCK_NOTE_W_TITLE_CONTENT.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_W_TITLE_CONTENT.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            NEW_UPDATED_AT.getTime()
        )
    })

    it('returns 404 when updating an inaccessible note when authorized', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.update.mockImplementation(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                '\nInvalid `prisma.note.update()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to update not found.',
                {
                    clientVersion: '4.15.0',
                    code: 'P2025',
                    meta: { cause: 'Record to update not found.' },
                }
            )
            throw err
        })

        expect.assertions(3)

        const res = await request(app)
            .patch(`/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`)
            .send({ content: PATCHED_CONTENT })

        expect(res.status).toBe(404)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Not found')
    })

    it('returns 401 when unauthorized', async () => {
        protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

        expect.assertions(3)

        const res = await request(app).patch(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(401)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Unauthorized')
    })
})

describe('delete note endpoint', () => {
    it('returns note when deleting an owned note', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.delete.mockResolvedValue(MOCK_NOTE_EMPTY)

        expect.assertions(6)

        const res = await request(app).delete(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(200)
        expect(res.body.data.uuid).toBe(MOCK_NOTE_EMPTY.uuid)
        expect(res.body.data.title).toBe(MOCK_NOTE_EMPTY.title)
        expect(res.body.data.content).toBe(MOCK_NOTE_EMPTY.content)
        expect(new Date(res.body.data.createdAt).getTime()).toBe(
            MOCK_NOTE_EMPTY.createdAt.getTime()
        )
        expect(new Date(res.body.data.updatedAt).getTime()).toBe(
            MOCK_NOTE_EMPTY.updatedAt.getTime()
        )
    })

    it('returns 404 when deleting an inaccessible note', async () => {
        protectMiddlewareMock.mockImplementation(
            genProtectMiddlewareAuthImpl(MOCK_REQ_USER)
        )
        prismaMock.note.delete.mockImplementation(() => {
            const err = new Prisma.PrismaClientKnownRequestError(
                '\nInvalid `prisma.note.delete()` invocation:\n\n\nAn operation failed because it depends on one or more records that were required but not found. Record to delete does not exist.',
                {
                    clientVersion: '4.15.0',
                    code: 'P2025',
                    meta: { cause: 'Record to delete does not exist.' },
                }
            )
            throw err
        })

        expect.assertions(3)

        const res = await request(app).delete(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(404)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Not found')
    })

    it('returns 401 when unauthorized', async () => {
        protectMiddlewareMock.mockImplementation(restoreProtectMiddlewareImpl)

        expect.assertions(3)

        const res = await request(app).delete(
            `/api/v1/notes/${MOCK_NOTE_EMPTY.uuid}`
        )

        expect(res.status).toBe(401)
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0]).toBe('Unauthorized')
    })
})
