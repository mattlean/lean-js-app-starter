import {
    ElectronApplication,
    _electron as electron,
    expect,
    test,
} from '@playwright/test'

/**
 * Click the focus mode menu item.
 * @param electronApp Electron application representation
 */
const clickFocusModeMenuItem = (electronApp: ElectronApplication) =>
    electronApp.evaluate(({ app, BrowserWindow }) => {
        if (!app || !app.applicationMenu) {
            throw new Error('Application or menu could not be found.')
        }

        const focusModeMenuItem =
            app.applicationMenu.getMenuItemById('focus-mode')

        if (!focusModeMenuItem) {
            throw new Error('Focus mode menu item could not be found.')
        }

        focusModeMenuItem.click(undefined, BrowserWindow.getAllWindows()[0])
    })

test('Focus mode activates when the menu option is clicked the first time', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    // Expect top bar to be visible
    await expect(window.getByRole('navigation')).toBeVisible()

    await clickFocusModeMenuItem(electronApp)

    // Expect top bar to be hidden
    await expect(window.getByRole('navigation')).not.toBeVisible()

    // Perform visual comparison of focus mode
    await expect(window).toHaveScreenshot('focus-mode.png')

    await electronApp.close()
})

test('Focus mode reactivates when the menu option is clicked the second time', async () => {
    const electronApp = await electron.launch({ args: ['.'] })
    const window = await electronApp.firstWindow()

    // Expect top bar to be visible
    await expect(window.getByRole('navigation')).toBeVisible()

    await clickFocusModeMenuItem(electronApp)

    // Expect top bar to be hidden
    await expect(window.getByRole('navigation')).not.toBeVisible()

    await clickFocusModeMenuItem(electronApp)

    // Expect top bar to be visible again
    await expect(window.getByRole('navigation')).toBeVisible()

    await electronApp.close()
})
