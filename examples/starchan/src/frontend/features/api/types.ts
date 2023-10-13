import { ServerErrorErrors } from '../../../backend/core/error/ServerError'

export interface APIErrorRes {
    errors?: ServerErrorErrors
}

export interface APIRes<Type> extends APIErrorRes {
    data?: Type[]
}
