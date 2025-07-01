"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function HeroUIThemeProvider({ children, locale }: { children: React.ReactNode, locale?: string }) {
    return <HeroUIProvider
        locale={locale}
        labelPlacement='outside'
        spinnerVariant="dots"
    >
        <NextThemesProvider attribute="class" defaultTheme="dark">
            {children}
        </NextThemesProvider>
    </HeroUIProvider>;
}