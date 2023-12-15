import { HttpResponse, http } from 'msw'

export const handlers = [
    http.get('http://localhost:3000/api/v1/threads', ({ request }) => {
        // Construct a URL instance out of the intercepted request.
        const url = new URL(request.url)

        // Read the "id" URL query parameter using the "URLSearchParams" API.
        // Given "/product?id=1", "productId" will equal "1".
        console.log('page param', url.searchParams.get('page'))

        return HttpResponse.json({
            data: [],
            hasNextPage: false,
            hasPreviousPage: false,
            totalPages: 0,
        })
    }),

    http.get('http://localhost:3000/api/v1/threads/:threadId', () =>
        HttpResponse.json({
            data: {
                id: '655db5f754dc351dd0e94466',
                subject: null,
                comment: 'supppppk',
                createdAt: '2023-11-22T08:04:07.284Z',
                replies: [],
            },
        })
    ),
]
