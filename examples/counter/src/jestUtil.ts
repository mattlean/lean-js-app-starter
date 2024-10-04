/**
 * Clear the root element.
 * This is intended to completely empty the root element's children between tests
 * so test results can be consistent.
 * @param rootEl Optionally pass in the rootEl to be cleared, otherwise a query for the element with the root ID will be made
 */
export const clearRootEl = (rootEl?: HTMLElement) => {
    const r = rootEl ? rootEl : document.getElementById('root')

    if (!r) {
        throw new Error('HTML element with an ID of "root" was not found.')
    }

    r.innerHTML = ''
}

/**
 * Setup the root element.
 * The root div element is intended for other elements to mount to for testing.
 * @returns The new root element
 */
export const setupRootEl = () => {
    const rootEl = document.createElement('div')
    rootEl.setAttribute('id', 'root')
    document.body.replaceChildren(rootEl)

    return rootEl
}
