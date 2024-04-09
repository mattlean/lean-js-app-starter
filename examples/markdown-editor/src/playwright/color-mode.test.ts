import {
    ElectronApplication,
    _electron as electron,
    expect,
    test,
} from '@playwright/test'

import { colorModes } from '../common/types'

/**
 * Get the color mode menu item.
 * @param electronApp Electron application representation
 * @return A promise that will resolve to the color mode menu item
 */
const getColorModeMenuItem = async (electronApp: ElectronApplication) =>
    electronApp.evaluate(({ Menu }) => {
        const appMenu = Menu.getApplicationMenu()

        if (!appMenu) {
            throw new Error('Application menu could not be found.')
        }

        return appMenu.getMenuItemById('color-mode')
    })

/**
 * Click a color mode submenu item.
 * @param electronApp Electron application representation
 * @param colorMode Color mode type that determines which color mode to use
 * @returns A promise that will resolve to the updated color mode menu item
 */
const clickColorModeSubmenuItem = async (
    electronApp: ElectronApplication,
    colorMode: colorModes,
) =>
    electronApp.evaluate(({ BrowserWindow, Menu }, colorMode) => {
        const appMenu = Menu.getApplicationMenu()

        if (!appMenu) {
            throw new Error('Application menu could not be found.')
        }

        const colorModeSubmenuItem = appMenu.getMenuItemById(colorMode)

        if (!colorModeSubmenuItem) {
            throw new Error('Color mode submenu item could not be found.')
        }

        colorModeSubmenuItem.click(undefined, BrowserWindow.getAllWindows()[0])

        return appMenu.getMenuItemById('color-mode')
    }, colorMode)

test('Color mode defaults to system preference mode', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    const colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Expect button to start with system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Perform visual comparison of system preference mode
    await expect(window).toHaveScreenshot('sys-pref-mode.png')

    await electronApp.close()
})

test('Color mode is light when system preference mode is active and the OS is set to light', async () => {
    const electronApp = await electron.launch({
        args: ['.'],
        colorScheme: 'light',
    })
    const window = await electronApp.firstWindow()

    const colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)

    // Expect button to start with system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Perform visual comparison of system preference mode (light)
    await expect(window).toHaveScreenshot('sys-pref-mode-light.png')

    await electronApp.close()
})

test('Color mode is dark when system preference mode is active and the OS is set to dark', async () => {
    const electronApp = await electron.launch({
        args: ['.'],
        colorScheme: 'dark',
    })
    const window = await electronApp.firstWindow()

    const colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)

    // Expect button to start with system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Perform visual comparison of system preference mode (dark)
    await expect(window).toHaveScreenshot('sys-pref-mode-dark.png')

    await electronApp.close()
})

test('Active color mode submenu item switches to light mode when it is selected', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    let colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Expect button to start with system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Click on the light mode menu item
    colorModeMenuItem = await clickColorModeSubmenuItem(electronApp, 'light')

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to be set to light mode
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[1].label).toBe('Light Mode')
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Expect button to be set to light mode
    await expect(
        window.getByRole('button', { name: /light mode/i }),
    ).toBeVisible()

    // Perform visual comparison of light mode
    await expect(window).toHaveScreenshot('light-mode.png')

    await electronApp.close()
})

test('Active color mode submenu item switches to dark mode when it is selected', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    let colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Expect button to start with system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Click on the dark mode menu item
    colorModeMenuItem = await clickColorModeSubmenuItem(electronApp, 'dark')

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to be set to dark mode
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].label).toBe('Dark Mode')
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(true)

    // Expect button to be set to dark mode
    await expect(
        window.getByRole('button', { name: /dark mode/i }),
    ).toBeVisible()

    // Perform visual comparison of dark mode
    await expect(window).toHaveScreenshot('dark-mode.png')

    await electronApp.close()
})

test('Active color mode submenu item switches to system preference mode when it is selected', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    let colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Expect button to start with system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Click on the dark mode menu item
    colorModeMenuItem = await clickColorModeSubmenuItem(electronApp, 'dark')

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect active color mode submenu item to be set to dark mode
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].label).toBe('Dark Mode')
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(true)

    // Expect button to be set to dark mode
    await expect(
        window.getByRole('button', { name: /dark mode/i }),
    ).toBeVisible()

    // Click on the system preference mode menu item
    colorModeMenuItem = await clickColorModeSubmenuItem(electronApp, 'sysPref')

    // Expect active color mode submenu item to return to system preference mode
    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Expect button to be return to system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    await electronApp.close()
})

test('Active color mode submenu item is light mode when color mode button is set to light mode', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    let colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to start with system preference mode
    const colorModeBtn = window.getByRole('button', {
        name: /sys. pref. mode/i,
    })
    await expect(colorModeBtn).toBeVisible()

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Click on the color mode button to switch to light mode
    await colorModeBtn.click()

    colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to be set to light mode
    await expect(
        window.getByRole('button', { name: /light mode/i }),
    ).toBeVisible()

    // Expect active color mode submenu item to be set to light mode
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[1].label).toBe('Light Mode')
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    await electronApp.close()
})

test('Active color mode submenu item is dark mode when color mode button is set to dark mode', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    let colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to start with system preference mode
    const colorModeBtn = window.getByRole('button', {
        name: /sys. pref. mode/i,
    })
    await expect(colorModeBtn).toBeVisible()

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Click on the color mode button twice to switch to dark mode
    await colorModeBtn.dblclick()

    colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to be set to dark mode
    await expect(
        window.getByRole('button', { name: /dark mode/i }),
    ).toBeVisible()

    // Expect active color mode submenu item to be set to dark mode
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].label).toBe('Dark Mode')
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(true)

    await electronApp.close()
})

test('Active color mode submenu item is system preference mode when color mode button is set to system preference mode', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    let colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to start with system preference mode
    let colorModeBtn = window.getByRole('button', {
        name: /sys. pref. mode/i,
    })
    await expect(colorModeBtn).toBeVisible()

    // Expect active color mode submenu item to start with system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    // Click on the color mode button twice to switch to dark mode
    await colorModeBtn.dblclick()

    colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to be set to dark mode
    colorModeBtn = window.getByRole('button', { name: /dark mode/i })
    await expect(colorModeBtn).toBeVisible()

    // Expect active color mode submenu item to be set to dark mode
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].label).toBe('Dark Mode')
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(true)

    // Click on the color mode button to return to system preference mode
    await colorModeBtn.click()

    colorModeMenuItem = await getColorModeMenuItem(electronApp)

    if (!colorModeMenuItem || !colorModeMenuItem.submenu) {
        throw new Error('Color mode menu could not be found.')
    }

    // Expect button to return to system preference mode
    await expect(
        window.getByRole('button', { name: /sys. pref. mode/i }),
    ).toBeVisible()

    // Expect active color mode submenu item to return to system preference mode
    expect(colorModeMenuItem.submenu.items[0].label).toBe(
        'Use System Preference',
    )
    expect(colorModeMenuItem.submenu.items[0].checked).toBe(true)
    expect(colorModeMenuItem.submenu.items[1].checked).toBe(false)
    expect(colorModeMenuItem.submenu.items[2].checked).toBe(false)

    await electronApp.close()
})
