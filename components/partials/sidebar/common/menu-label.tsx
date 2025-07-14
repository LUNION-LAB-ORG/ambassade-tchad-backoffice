'use client'
import { cn } from "@/lib/utils"
import { useConfig } from '@/hooks/use-config'
import React from 'react'

const MenuLabel = ({ label, className }: { label: string, className?: string }) => {
    const [config] = useConfig()
    if (config.sidebar === 'compact') return null
    return (
        <p className={cn('text-xs font-semibold py-4 max-w-[248px] truncate uppercase transition-colors text-white', className)}>
            {label}
        </p>
    )
}

export default MenuLabel