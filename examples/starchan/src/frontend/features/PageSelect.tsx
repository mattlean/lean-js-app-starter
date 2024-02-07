import { Link, useParams } from 'react-router-dom'

import { MAX_THREADS, PAGE_SIZE } from '../../backend/routes/constants'

export interface Props {
    totalPages?: number
}

export default function PageSelect({ totalPages }: Props) {
    const { page } = useParams()
    const currPage = page ? parseInt(page) : 1

    const lastPage = Math.min(MAX_THREADS / PAGE_SIZE, totalPages || 1)

    const pages = []
    for (let i = 1; i <= lastPage; ++i) {
        pages.push(
            <li
                key={i}
                className={
                    currPage === i
                        ? 'page-select__page page-select__page--active'
                        : 'page-select__page'
                }
            >
                [
                <Link
                    to={i === 1 ? '/' : `/${i}`}
                    onClick={() => window.scrollTo(0, 0)}
                >
                    {i}
                </Link>
                ]
            </li>
        )
    }

    return (
        <nav>
            <ol className="page-select" data-testid="page-select">
                {pages}
            </ol>
        </nav>
    )
}
