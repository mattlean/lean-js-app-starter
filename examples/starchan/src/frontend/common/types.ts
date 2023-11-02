import { Prisma } from '@prisma/client'

export type ThreadWithReplies = Prisma.ThreadGetPayload<{
    include: { replies: true }
}>
