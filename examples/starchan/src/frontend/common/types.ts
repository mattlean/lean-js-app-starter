import { Reply, Thread } from '@prisma/client'

export type ReplyResData = Omit<Reply, 'createdAt' | 'threadId'> & {
    createdAt: string
}

export type ThreadResData = Omit<Thread, 'createdAt'> & {
    bumpTime?: string
    createdAt: string
    replies: Array<ReplyResData>
    replyCount?: number
}
