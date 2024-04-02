// Icons sourced from: https://heroicons.com
import { ReactNode, useCallback, useEffect, useState } from 'react'

import { colorModes } from '../../common/types'
import { applyColorMode } from '../colorMode'

/**
 * React button component that controls the color mode.
 */
export default function ColorModeBtn() {
    const [colorModeType, setColorModeType] = useState<colorModes>(() => {
        if (localStorage.theme === 'light') {
            return 'light'
        } else if (localStorage.theme === 'dark') {
            return 'dark'
        } else {
            return 'auto'
        }
    })

    const changeColorMode = useCallback(
        (colorMode: colorModes, syncMenu = true) => {
            setColorModeType(colorMode)
            applyColorMode(colorMode)

            if (syncMenu) {
                window.api.syncColorModeMenu(colorMode)
            }
        },
        [],
    )

    let icon: ReactNode
    let text: string

    if (colorModeType === 'light') {
        icon = (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
        )
        text = 'Light Mode'
    } else if (colorModeType === 'dark') {
        icon = (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
        )
        text = 'Dark Mode'
    } else {
        icon = (
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
            />
        )
        text = 'Sys. Pref. Mode'
    }

    useEffect(() => {
        const removeColorModeMenuListener = window.api.onColorModeMenu(
            (colorMode) => {
                changeColorMode(colorMode, false)
            },
        )

        return () => {
            removeColorModeMenuListener()
        }
    }, [changeColorMode])

    return (
        <button
            className="btn flex space-x-2"
            onClick={() => {
                if (colorModeType === 'light') {
                    changeColorMode('dark')
                } else if (colorModeType === 'dark') {
                    changeColorMode('auto')
                } else {
                    changeColorMode('light')
                }
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
            >
                {icon}
            </svg>
            <span>{text}</span>
        </button>
    )
}
