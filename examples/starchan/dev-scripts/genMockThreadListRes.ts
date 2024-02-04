import { Reply, Thread } from '@prisma/client'
import fs from 'node:fs/promises'

/**
 * Type for thread data imported from JSON file.
 */
type ThreadInputData = Omit<Thread, 'createdAt'> & {
    createdAt: string
    replies: Array<
        Omit<Reply, 'createdAt'> & {
            createdAt: string
        }
    >
}

/**
 * Type for thread data used in thread list endpoint response.
 */
type MockThreadResData = Omit<Thread, 'createdAt'> & {
    bumpTime?: string
    createdAt: string
    replies: Array<
        Omit<Reply, 'createdAt' | 'threadId'> & {
            createdAt: string
        }
    >
    replyCount: number
}

/**
 * Convert JSON list of thread data into the data and order that would be returned by
 * a GET request to the list threads endpoint.
 */
const genMockThreadListRes = async () => {
    const PREFIX = '[🏭 genMockThreadListRes.ts]'
    console.log(
        `${PREFIX} Beginning the dev mock thread list response generation script...`
    )

    if (process.argv.length < 3) {
        throw new Error('Expected an input JSON file of thread data.')
    }

    const outputFileName = process.argv[3] || 'output.json'

    // Read the input thread data and convert it from JSON to an object
    const inputDataTxt = await fs.readFile(process.argv[2], {
        encoding: 'utf8',
    })
    const threadData: ThreadInputData[] = JSON.parse(inputDataTxt)

    // Add the replyCount and bumpTime to each thread's data
    const mockThreadListRes: MockThreadResData[] = threadData.map((t) => ({
        ...t,
        replyCount: t.replies.length,
        bumpTime: t.replies[t.replies.length - 1]?.createdAt || t.createdAt,
    }))

    // Sort by bumpTime
    mockThreadListRes.sort((a, b) => {
        const bumpTimeA = (a.bumpTime && new Date(a.bumpTime)) || null
        const bumpTimeB = (b.bumpTime && new Date(b.bumpTime)) || null

        if (bumpTimeA !== null && bumpTimeB !== null) {
            if (bumpTimeA > bumpTimeB) {
                return -1
            } else if (bumpTimeA < bumpTimeB) {
                return 1
            } else {
                return 0
            }
        }

        // Cover case where bumpTime is null
        if (bumpTimeA && !bumpTimeB) {
            return -1
        } else if (!bumpTimeA && bumpTimeB) {
            return 1
        }

        return 0
    })

    // Remove bumpTime since it is only needed for sorting and is
    // not included in the response, and only keep the 5 most
    // recent replies in each thread
    mockThreadListRes.forEach((t) => {
        t.replies = t.replies.slice(t.replies.length - 5)
        delete t.bumpTime
    })

    const outputDataTxt = JSON.stringify(mockThreadListRes)

    await fs.writeFile(outputFileName, outputDataTxt)

    console.log(`${PREFIX} Generated "${outputFileName}".`)
    console.log(
        `${PREFIX} Dev mock thread list response generation script completed!`
    )
}

// Execute the script
genMockThreadListRes()
