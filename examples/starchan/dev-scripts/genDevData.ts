import { LoremIpsum } from 'lorem-ipsum'

import { prisma } from '../src/backend/common/prisma'

/**
 * Generate threads with random content.
 * Intended to initiate the app with sample data to work with.
 * @param {number} [threadsNum=200] Number of threads to generate.
 * @param {boolean} [outputJson] Output the generated data as JSON.
 */
const genDevData = async (threadsNum = 200, outputJson = false) => {
    const PREFIX = '[🌱 genDevData.ts]'

    if (!outputJson) {
        console.log(`${PREFIX} Beginning the dev data generation script...`)
    }

    // Setup lorem ipsum
    const lipsum = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4,
        },
        wordsPerSentence: {
            max: 16,
            min: 4,
        },
    })

    const threadIds: string[] = []

    // Create threads
    let count
    for (count = 0; count < threadsNum; ++count) {
        const newThread = await prisma.thread.create({
            data: {
                subject: `Generated thread ${count + 1} (${lipsum.generateWords(
                    1,
                )})`,
                comment: lipsum.generateSentences(3),
            },
        })

        threadIds.push(newThread.id)
    }

    // Create replies for threads for every other thread
    // when they are arranged in insertion order
    for (let i = 0; i < threadsNum; i += 2) {
        const repliesToCreate = Math.ceil(i / 4)

        for (let j = 0; j < repliesToCreate; ++j) {
            await prisma.reply.create({
                data: {
                    comment: lipsum.generateSentences(1),
                    threadId: threadIds[i],
                },
            })
        }
    }

    if (outputJson) {
        // Output the generated data as JSON
        const threads = await prisma.thread.findMany({
            include: {
                replies: {
                    orderBy: { createdAt: 'asc' },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: threadsNum,
        })

        console.log(JSON.stringify(threads.reverse()))
    } else {
        console.log(`${PREFIX} Generated ${count} threads.`)
        console.log(`${PREFIX} Dev data generation script completed!`)
    }
}

// Execute the dev data generation script
genDevData(200, process.argv[2] === '--outputJson')
