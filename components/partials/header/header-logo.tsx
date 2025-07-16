'use client'
import React from 'react'
import { Link } from '@/components/navigation'
import DashCodeLogo from "@/components/dascode-logo"
import { useConfig } from '@/hooks/use-config'
import { useMediaQuery } from '@/hooks/use-media-query'

const HeaderLogo = () => {
    const [config] = useConfig();

    const isDesktop = useMediaQuery('(min-width: 1280px)');

    return (
        config.layout === 'horizontal' ? (
            <Link href="/dashboard/analytics" className="flex gap-3 items-center hover:bg-embassy-blue-50 rounded-lg px-2 py-1 transition-all duration-200 dark:hover:bg-embassy-blue-800/30">
                <DashCodeLogo className="text-embassy-blue-200 h-8 w-8 [&>path:nth-child(3)]:text-embassy-yellow-500 [&>path:nth-child(2)]:text-embassy-red-500 dark:text-embassy-blue-300" />
                <h1 className="text-xl font-bold  lg:block hidden text-white">
                    Ambassade du Tchad
                </h1>
            </Link>
        ) :
            !isDesktop && (
                <Link href="/dashboard/analytics" className="flex gap-3 items-center hover:bg-embassy-blue-50 rounded-lg px-2 py-1 transition-all duration-200 dark:hover:bg-embassy-blue-800/30">
                    <DashCodeLogo className="text-embassy-blue-20 h-8 w-8 [&>path:nth-child(3)]:text-embassy-yellow-500 [&>path:nth-child(2)]:text-embassy-red-500 dark:text-embassy-blue-300" />
                    <h1 className="text-xl font-bold lg:block hidden text-white">
                        Ambassade du Tchad
                    </h1>
                </Link>
            )
    )   
}

export default HeaderLogo