import { ThreadResData } from '../frontend/common/types'
import { APIRes } from '../frontend/features/api/types'

/**
 * Set the document title for the thread list page.
 * @param page The page number of the current thread list page
 */
export const setThreadListPageTitle = (page: number) => {
    if (page !== 1) {
        return `Thread List Page ${page} - ljas-starchan`
    }

    return 'ljas-starchan'
}

/**
 * Set the document title for the thread page.
 * @param res The thread data from the GET thread endpoint response
 */
export const setThreadPageTitle = (res?: APIRes<ThreadResData>) => {
    if (res) {
        if (res.data?.subject) {
            return `${res.data.subject} - ljas-starchan`
        }

        if (res.data?.id) {
            return `Thread ${res.data.id} - ljas-starchan`
        }
    }

    return 'Thread Page - ljas-starchan'
}
