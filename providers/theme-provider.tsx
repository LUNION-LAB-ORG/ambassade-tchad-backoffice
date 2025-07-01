"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { HeroUIProvider } from "@heroui/react";

export function ThemeProvider({ children, locale, ...props }: ThemeProviderProps & { locale?: string }) {
    const { defaultTheme, attribute, ...restHeroUIProps } = props;

    return (
        <HeroUIProvider
            locale={locale}
            labelPlacement='outside'
            spinnerVariant="dots"
            {...restHeroUIProps}
        >
            <NextThemesProvider
                defaultTheme={defaultTheme}
                attribute={attribute}
            >
                {children}
            </NextThemesProvider>
        </HeroUIProvider>
    )
}