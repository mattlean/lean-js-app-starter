/**
 * Build the preloaded state that will be used as the initial state for the Redux store.
 * @param state State to build preloaded state from
 * @returns Stringified and sanitized state
 */
export const buildPreloadedState = (
    state: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => JSON.stringify(state).replace(/</g, '\\u003c')
