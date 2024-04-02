import { colorModes } from '../common/types'

/**
 * Change the color mode by applying new color mode styles and update the color mode
 * menu state to reflect the newly active color mode.
 * @param colorMode Color mode type that determines which color mode to use
 */
export const applyColorMode = (colorMode: colorModes) => {
    if (colorMode === 'light') {
        localStorage.theme = 'light'
        window.api.syncColorModeMenu('light')
        document.documentElement.classList.remove('dark')
    } else if (colorMode === 'dark') {
        localStorage.theme = 'dark'
        window.api.syncColorModeMenu('dark')
        document.documentElement.classList.add('dark')
    } else {
        localStorage.removeItem('theme')
        window.api.syncColorModeMenu('auto')

        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
}

/**
 * Setup the initial color mode when the app loads.
 */
export const setupColorMode = () => {
    if (localStorage.theme === 'light') {
        applyColorMode('light')
    } else if (localStorage.theme === 'dark') {
        applyColorMode('dark')
    } else {
        applyColorMode('auto')
    }
}
