import { Dispatch, RefObject } from 'react'

import { ErrorMessageActions } from '../errorMessageReducer'

export interface Props {
    errorMessageDispatch: Dispatch<ErrorMessageActions>
    refPreview: RefObject<HTMLElement>
}

/**
 * React button component that initiates the HTML export process.
 */
export default function HtmlExportBtn({
    errorMessageDispatch,
    refPreview,
}: Props) {
    return (
        <button
            className="btn"
            onClick={() => {
                if (refPreview.current) {
                    window.api.showHtmlExportDialog(
                        refPreview.current.innerHTML,
                    )
                } else {
                    errorMessageDispatch({
                        type: 'set',
                        payload: 'Preview element could not be found.',
                    })
                }
            }}
        >
            Export as HTML
        </button>
    )
}
