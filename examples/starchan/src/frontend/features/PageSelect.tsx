import { Link } from 'react-router-dom'

export interface Props {
    totalPages?: number
}

export default function PageSelect({ totalPages }: Props) {
    const lastPage = totalPages || 1

    const pages = []
    for (let i = 1; i <= lastPage; ++i) {
        pages.push(
            <li key={i}>
                <Link
                    to={i === 1 ? '/' : `/${i}`}
                    onClick={() => scrollTo(0, 0)}
                >
                    {i}
                </Link>
            </li>
        )
    }

    return <ul>{pages}</ul>
}
