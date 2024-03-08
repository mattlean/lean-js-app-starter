import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export interface Props {
    input: string
}

export default function Preview({ input }: Props) {
    const [output, setOutput] = useState('')
    const refPreview = useRef<HTMLHeadingElement | null>(null)
    const [styleOffset, setStyleOffset] = useState<
        React.CSSProperties | undefined
    >(undefined)

    useLayoutEffect(() => {
        if (refPreview.current) {
            const { height } = refPreview.current.getBoundingClientRect()
            setStyleOffset({ marginTop: height })
        }
    }, [])

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
        <div className="flex w-full flex-col overflow-scroll">
            <h1
                ref={refPreview}
                className="fixed top-0 w-full border-b border-gray-500 bg-gray-900 px-3 py-1"
            >
                Preview
            </h1>
            <article
                dangerouslySetInnerHTML={createMarkup()}
                className="prose px-3 py-2 dark:prose-invert"
                style={styleOffset}
            />
        </div>
    )
}
