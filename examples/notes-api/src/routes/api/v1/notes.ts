import { NextFunction, Request, Response, Router } from 'express'
import { body } from 'express-validator'

import {
    isPrismaKnownRequestError,
    validateErrorMiddleware,
} from '../../../core/error'
import { ServerError } from '../../../core/error'
import { prisma } from '../../../core/prisma'
import { isUuidv4 } from '../../../util'

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

/**
 * @openapi
 * /api/v1/notes:
 *   post:
 *     description: Create a note for the user that is currently authenticated.
 *     summary: Create a note
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: I am the title for a new note!
 *               content:
 *                 type: string
 *                 default: I am the content for a new note!
 *     responses:
 *       201:
 *         description: Create a new note for the currently authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Note"
 *       401:
 *         description: Attempt to create a new note while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               "Guest access":
 *                 value:
 *                   errors: ["Unauthorized"]
 *               "Invalid token":
 *                 value:
 *                   errors: ["Invalid token"]
 *     tags:
 *       - Notes
 */
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

/**
 * @openapi
 * /api/v1/notes/{noteUuid}:
 *   get:
 *     description: Read a note owned by the user that is currently authenticated.
 *     summary: Read a note
 *     parameters:
 *       - in: path
 *         name: noteUuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID associated with the user's note
 *     responses:
 *       200:
 *         description: Get the currently authenticated user's note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Note"
 *       401:
 *         description: Attempt to get a note while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               "Guest access":
 *                 value:
 *                   errors: ["Unauthorized"]
 *               "Invalid token":
 *                 value:
 *                   errors: ["Invalid token"]
 *       404:
 *         description: Read a note that cannot be found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               errors: ["Not found"]
 *     tags:
 *       - Notes
 */
router.get(
    '/:noteUuid',
    async (req, res, next) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        if (!isUuidv4(req.params.noteUuid)) {
            return next(
                new ServerError(
                    'notFound',
                    undefined,
                    'Route parameter is not a valid version 4 UUID.'
                )
            )
        }

        try {
            res.locals.note = await prisma.note.findUniqueOrThrow({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.noteUuid,
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

/**
 * @openapi
 * /api/v1/notes:
 *   get:
 *     description: List notes owned by the user that is currently authenticated.
 *     summary: List notes
 *     responses:
 *       200:
 *         description: List the currently authenticated user's notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Note"
 *       401:
 *         description: Attempt to list notes while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               "Guest access":
 *                 value:
 *                   errors: ["Unauthorized"]
 *               "Invalid token":
 *                 value:
 *                   errors: ["Invalid token"]
 *     tags:
 *       - Notes
 */
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

/**
 * @openapi
 * /api/v1/notes/{noteUuid}:
 *   put:
 *     description: Update a note owned by the user that is currently authenticated.
 *     summary: Update a note
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Note
 *               content:
 *                 type: string
 *                 example: This note was updated with a PUT request.
 *     parameters:
 *       - in: path
 *         name: noteUuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID associated with the user's note
 *     responses:
 *       200:
 *         description: Completely update the currently authenticated user's note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Note"
 *       401:
 *         description: Attempt to update a note while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               "Guest access":
 *                 value:
 *                   errors: ["Unauthorized"]
 *               "Invalid token":
 *                 value:
 *                   errors: ["Invalid token"]
 *       404:
 *         description: Update a note that cannot be found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               errors: ["Not found"]
 *     tags:
 *       - Notes
 */
router.put(
    '/:noteUuid',
    noteValidationChain(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        if (!isUuidv4(req.params.noteUuid)) {
            return next(
                new ServerError(
                    'notFound',
                    undefined,
                    'Route parameter is not a valid version 4 UUID.'
                )
            )
        }

        try {
            res.locals.note = await prisma.note.update({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.noteUuid,
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

/**
 * @openapi
 * /api/v1/notes/{noteUuid}:
 *   patch:
 *     description: Patch a note owned by the user that is currently authenticated.
 *     summary: Patch a note
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: The content property of this note was updated with a PATCH request.
 *     parameters:
 *       - in: path
 *         name: noteUuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID associated with the user's note
 *     responses:
 *       200:
 *         description: Update specific properties on the currently authenticated user's note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Note"
 *       401:
 *         description: Attempt to patch a note while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               "Guest access":
 *                 value:
 *                   errors: ["Unauthorized"]
 *               "Invalid token":
 *                 value:
 *                   errors: ["Invalid token"]
 *       404:
 *         description: Patch a note that cannot be found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               errors: ["Not found"]
 *     tags:
 *       - Notes
 */
router.patch(
    '/:noteUuid',
    noteValidationChain(),
    validateErrorMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        if (!isUuidv4(req.params.noteUuid)) {
            return next(
                new ServerError(
                    'notFound',
                    undefined,
                    'Route parameter is not a valid version 4 UUID.'
                )
            )
        }

        try {
            res.locals.note = await prisma.note.update({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.noteUuid,
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

/**
 * @openapi
 * /api/v1/notes/{noteUuid}:
 *   delete:
 *     description: Delete a note owned by the user that is currently authenticated.
 *     summary: Delete a note
 *     parameters:
 *       - in: path
 *         name: noteUuid
 *         schema:
 *           type: string
 *         required: true
 *         description: UUID associated with the user's note
 *     responses:
 *       200:
 *         description: Delete the currently authenticated user's note
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Note"
 *       401:
 *         description: Attempt to delete a note while using an invalid JWT or no JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             examples:
 *               "Guest access":
 *                 value:
 *                   errors: ["Unauthorized"]
 *               "Invalid token":
 *                 value:
 *                   errors: ["Invalid token"]
 *       404:
 *         description: Delete a note that cannot be found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   $ref: "#/components/schemas/ErrorResponse"
 *             example:
 *               errors: ["Not found"]
 *     tags:
 *       - Notes
 */
router.delete(
    '/:noteUuid',
    async (req, res, next) => {
        if (!req.user) {
            return next(new ServerError('auth'))
        }

        if (!isUuidv4(req.params.noteUuid)) {
            return next(
                new ServerError(
                    'notFound',
                    undefined,
                    'Route parameter is not a valid version 4 UUID.'
                )
            )
        }

        try {
            res.locals.note = await prisma.note.delete({
                where: {
                    uuid_ownerUuid: {
                        uuid: req.params.noteUuid,
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
