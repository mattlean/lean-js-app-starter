import { ServerErrorErrors } from '../../../backend/common/error/ServerError'

export interface APIErrorRes {
    errors?: ServerErrorErrors
    info?: {
        threadCount?: number
        totalPages?: number
        hasNextPage?: number
        hasPreviousPage?: number
    }
}

export interface APIRes<Type> extends APIErrorRes {
    data?: Type
}
