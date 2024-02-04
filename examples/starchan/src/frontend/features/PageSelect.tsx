import { Link } from 'react-router-dom'

import { MAX_THREADS, PAGE_SIZE } from '../../backend/routes/constants'

export interface Props {
    totalPages?: number
}

export default function PageSelect({ totalPages }: Props) {
    const lastPage = Math.min(MAX_THREADS / PAGE_SIZE, totalPages || 1)

    const pages = []
    for (let i = 1; i <= lastPage; ++i) {
        pages.push(
            <li key={i}>
                <Link
                    to={i === 1 ? '/' : `/${i}`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    {i}
                </Link>
            </li>
        )
    }

    return (
        <nav>
            <ol>{pages}</ol>
        </nav>
    )
}
