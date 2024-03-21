import { Menu } from 'electron'

// import { colorModes } from '../common/types'
import { sendMainErrorMessage } from './mse'

/**
 * Set the color mode in the color mode menu.
 * @param colorMode Color mode type that determines which color mode to use
 */
const setColorModeMenu = (colorMode: string) => {
    console.log('got here', colorMode)
    const colorModeMenuItem =
        Menu.getApplicationMenu()?.getMenuItemById('color-mode')

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        sendMainErrorMessage(new Error('Color mode menu could not be found.'))
        return
    }

    colorModeMenuItem.submenu.items.forEach((item) => {
        if (colorMode === item.id) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
}

export default setColorModeMenu
