import { useCallback, useEffect, useState } from 'react'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export interface Props {
    input: string
    refPreview: React.RefObject<HTMLElement>
}

export default function Preview({ input, refPreview }: Props) {
    const [output, setOutput] = useState('')

    useEffect(() => {
        const parseMd = async () => {
            const mdHtml = await unified()
                .use(remarkParse)
                .use(remarkRehype)
                .use(rehypeStringify)
                .process(input)

            setOutput(String(mdHtml))
        }

        parseMd()
    }, [input])

    const createMarkup = useCallback(
        () => ({
            __html: output,
        }),
        [output],
    )

    return (
        <div className="flex w-full flex-1 flex-col">
            <h1 className="border-b border-gray-500 px-3 py-1">Preview</h1>
            <article
                ref={refPreview}
                dangerouslySetInnerHTML={createMarkup()}
                className="prose flex-1 overflow-scroll bg-gray-900 px-3 py-2 dark:prose-invert"
                style={{ textRendering: 'optimizeLegibility', fontSmooth: '' }}
            />
        </div>
    )
}
