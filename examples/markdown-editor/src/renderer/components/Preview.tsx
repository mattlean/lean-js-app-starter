import { RefObject, useCallback, useEffect, useState } from 'react'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export interface Props {
    isFocusMode: boolean
    markdown: string
    refPreview: RefObject<HTMLElement>
}

/**
 * React component that converts the markdown from the editor to HTML and renders
 * that to the user.
 */
export default function Preview({ isFocusMode, markdown, refPreview }: Props) {
    const [output, setOutput] = useState('')

    useEffect(() => {
        const parseMd = async () => {
            const mdHtml = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(markdown)

            setOutput(String(mdHtml))
        }

        parseMd()
    }, [markdown])

    const createMarkup = useCallback(
        () => ({
            __html: output,
        }),
        [output],
    )

    return (
        <section className="flex w-1/2 flex-1 flex-col">
            {!isFocusMode && (
                <h1 className="border-b border-zinc-300 px-3 py-1 dark:border-gray-700">
                    Preview
                </h1>
            )}
            <article
                ref={refPreview}
                dangerouslySetInnerHTML={createMarkup()}
                className="prose flex-1 overflow-scroll bg-white px-3 py-2 dark:prose-invert dark:bg-gray-900"
                style={{ textRendering: 'optimizeLegibility', fontSmooth: '' }}
            />
        </section>
    )
}
