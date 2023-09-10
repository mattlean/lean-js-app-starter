import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator'

import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../core/error'
import { ServerError } from '../../../core/error'
import { prisma } from '../../../core/prisma'

const router = Router()

const noteValidationChain = () => [
    body('title').isString().optional({ values: 'null' }),
    body('content').isString().optional({ values: 'null' }),
]

/**
 * Express middleware that generates response data from a note or an array of notes.
 */
const genNoteDataMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (Array.isArray(res.locals.notes)) {
        res.locals.data = res.locals.notes.map((n) => {
            const d = { ...n }
            delete d.id
            delete d.ownerUuid
            return d
        })
    } else if (typeof res.locals.note === 'object') {
        res.locals.data = { ...res.locals.note }
        delete res.locals.data.id
        delete res.locals.data.ownerUuid
    } else {
        console.warn(
            `"res.locals.notes" and "res.locals.note" were both invalid data types. "res.locals.notes" had a type of "${typeof res
                .locals
                .notes}" and "res.locals.note" had a type of "${typeof res
                .locals.note}".`
        )
    }

    return next()
}

// Create a new note
router.post(
    '/',
    noteValidationChain(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        try {
            res.locals.note = await prisma.note.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    ownerUuid: req.user.uuid,
                },
            })
        } catch (err) {
            return next(err)
        }
        return next()
    },
    genNoteDataMiddleware,
    (req: Request, res: Response) =>
        res.status(201).json({ data: res.locals.data })
)

// Read a note
router.get(
    '/:uuid',
    async (req, res, next) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        try {
            res.locals.note = await prisma.note.findUniqueOrThrow({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.uuid,
                        ownerUuid: req.user.uuid,
                    },
                },
            })
        } catch (err) {
            if (
                err instanceof Error &&
                isPrismaKnownRequestError(err) &&
                err.code === 'P2025' &&
                err.message.match(/no note found/i)
            ) {
                return next(new ServerError('notFound', undefined, err))
            }
            return next(err)
        }

        return next()
    },
    genNoteDataMiddleware,
    (req, res) => res.json({ data: res.locals.data })
)

// List notes
router.get(
    '/',
    async (req, res, next) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        let notes
        try {
            notes = await prisma.note.findMany({
                where: {
                    ownerUuid: req.user.uuid,
                },
            })
        } catch (err) {
            return next(err)
        }

        res.locals.notes = notes
        return next()
    },
    genNoteDataMiddleware,
    (req, res) => res.json({ data: res.locals.data })
)

// Update a note
router.put(
    '/:uuid',
    noteValidationChain(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        try {
            res.locals.note = await prisma.note.update({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.uuid,
                        ownerUuid: req.user.uuid,
                    },
                },
                data: {
                    title: req.body.title ?? null,
                    content: req.body.content ?? null,
                },
            })
        } catch (err) {
            if (
                err instanceof Error &&
                isPrismaKnownRequestError(err) &&
                err.code === 'P2025' &&
                typeof err.meta?.cause === 'string' &&
                err.meta?.cause?.match(/record to update not found/i)
            ) {
                return next(new ServerError('notFound', undefined, err))
            }
            return next(err)
        }

        return next()
    },
    genNoteDataMiddleware,
    (req: Request, res: Response) => res.json({ data: res.locals.data })
)

// Patch a note
router.patch(
    '/:uuid',
    noteValidationChain(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        try {
            res.locals.note = await prisma.note.update({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.uuid,
                        ownerUuid: req.user.uuid,
                    },
                },
                data: {
                    title: req.body.title,
                    content: req.body.content,
                },
            })
        } catch (err) {
            if (
                err instanceof Error &&
                isPrismaKnownRequestError(err) &&
                err.code === 'P2025' &&
                typeof err.meta?.cause === 'string' &&
                err.meta?.cause?.match(/record to update not found/i)
            ) {
                return next(new ServerError('notFound', undefined, err))
            }
            return next(err)
        }

        return next()
    },
    genNoteDataMiddleware,
    (req: Request, res: Response) => res.json({ data: res.locals.data })
)

// Delete a note
router.delete(
    '/:uuid',
    async (req, res, next) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        try {
            res.locals.note = await prisma.note.delete({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.uuid,
                        ownerUuid: req.user.uuid,
                    },
                },
            })
        } catch (err) {
            if (
                err instanceof Error &&
                isPrismaKnownRequestError(err) &&
                err.code === 'P2025' &&
                typeof err.meta?.cause === 'string' &&
                err.meta?.cause?.match(/record to delete does not exist/i)
            ) {
                return next(new ServerError('notFound', undefined, err))
            }
            return next(err)
        }

        return next()
    },
    genNoteDataMiddleware,
    (req, res) => res.json({ data: res.locals.data })
)

export { router as noteHandler }
