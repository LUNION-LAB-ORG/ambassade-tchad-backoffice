'use client'
import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import DashCodeLogo from '@/components/dascode-logo';
import { Group, Submenu } from '@/lib/menus';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useConfig } from '@/hooks/use-config';

interface IconNavProps {
    menuList: Group[]

}
const IconNav = ({ menuList }: IconNavProps) => {

    const [config, setConfig] = useConfig();


    return (
        <div className='h-full bg-sidebar border-r border-embassy-blue-200 dark:border-embassy-blue-600/30 border-dashed w-[72px]'>
            <div className="text-center py-5">
                <DashCodeLogo className="text-embassy-blue-800 h-8 w-8 [&>path:nth-child(3)]:text-embassy-yellow-500 [&>path:nth-child(2)]:text-embassy-red-500 mx-auto" />
            </div>
            <ScrollArea className="[&>div>div[style]]:!block h-full">
                <nav className="mt-8 h-full w-full ">
                    <ul className="h-full flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-2 ">
                        {menuList?.map(({ groupLabel, menus }, index) => (
                            <li key={index} className='block w-full'>
                                {menus?.map(({ href, label, icon, active, id, submenus }, menuIndex) => (

                                    <TooltipProvider disableHoverableContent key={menuIndex}>
                                        <Tooltip delayDuration={100}>
                                            <TooltipTrigger asChild>
                                                {submenus.length === 0 ? (
                                                    <Button 
                                                        onClick={() => setConfig((prevConfig) => ({ ...prevConfig, hasSubMenu: false, subMenu: true }))} 
                                                        asChild 
                                                        size="icon" 
                                                        color="secondary" 
                                                        variant={active ? 'default' : 'ghost'}
                                                        className={cn('h-12 w-12 mx-auto mb-2 hover:ring-1 hover:ring-offset-0 transition-all duration-200', {
                                                            // Active state
                                                            'bg-embassy-blue-100 dark:bg-embassy-blue-800/40 hover:bg-embassy-blue-200 dark:hover:bg-embassy-blue-700/60 ring-1 ring-embassy-blue-200 dark:ring-embassy-blue-600/40': active,
                                                            // Inactive state with white for both modes
                                                            'hover:ring-embassy-blue-200 dark:hover:ring-embassy-blue-600/40 hover:bg-embassy-blue-800/30': !active
                                                        })}
                                                    >

                                                        <Link href={href}>

                                                            <Icon icon={icon} className={cn('w-6 h-6 transition-colors', {
                                                                'text-embassy-blue-700 dark:text-embassy-blue-300': active,
                                                                'text-white': !active
                                                            })} />

                                                        </Link>

                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => setConfig((prevConfig) => ({ ...prevConfig, hasSubMenu: true, subMenu: false }))}
                                                        asChild 
                                                        size="icon" 
                                                        color="secondary" 
                                                        variant={active ? 'default' : 'ghost'}
                                                        className={cn('h-12 w-12 mx-auto mb-2 hover:ring-1 hover:ring-offset-0 transition-all duration-200', {
                                                            // Active state
                                                            'bg-embassy-blue-100 dark:bg-embassy-blue-800/40 hover:bg-embassy-blue-200 dark:hover:bg-embassy-blue-700/60 ring-1 ring-embassy-blue-200 dark:ring-embassy-blue-600/40': active,
                                                            // Inactive state with white for both modes
                                                            'hover:ring-embassy-blue-200 dark:hover:ring-embassy-blue-600/40 hover:bg-embassy-blue-800/30': !active
                                                        })}
                                                    >

                                                        <Link href={href}>

                                                            <Icon icon={icon} className={cn('w-6 h-6 transition-colors', {
                                                                'text-embassy-blue-700 dark:text-embassy-blue-300': active,
                                                                'text-white': !active
                                                            })} />

                                                        </Link>

                                                    </Button>

                                                )}


                                            </TooltipTrigger>

                                            <TooltipContent side="right" className="bg-white/95 backdrop-blur-sm border-embassy-blue-200 dark:bg-slate-800/95 dark:border-embassy-blue-600/30">
                                                <span className="text-embassy-blue-800 dark:text-white">{label}</span>
                                            </TooltipContent>

                                        </Tooltip>
                                    </TooltipProvider>

                                ))}
                            </li>
                        ))}

                    </ul>
                </nav>

            </ScrollArea>
        </div>

    )
}

export default IconNav