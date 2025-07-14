'use client'
import { Input } from '@/components/ui/input'
import { useConfig } from '@/hooks/use-config'
import React from 'react'
import {
    InputGroup,
    InputGroupButton,
    InputGroupText,
} from "@/components/ui/input-group";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useMenuHoverConfig } from '@/hooks/use-menu-hover';
const SearchBar = () => {
    const [config] = useConfig()
    const [hoverConfig] = useMenuHoverConfig();
    const { hovered } = hoverConfig;

    if (config.showSearchBar === false || config.sidebar === 'compact') return null


    return (
        <AnimatePresence>
            <motion.div
                key={(config.collapsed && !hovered) ? "collapsed" : "expanded"}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}

            >
                {(config.collapsed && !hovered) ? <CollapsedSearchBar /> :
                    <InputGroup merged >
                        <InputGroupText className='bg-embassy-blue-800/30 border-embassy-blue-600/30 group-focus-within:border-embassy-blue-500'>
                            <Search className='h-4 w-4 text-white' />
                        </InputGroupText>
                        <Input 
                            type="text" 
                            placeholder="Search Menu..." 
                            className='bg-embassy-blue-800/20 border-embassy-blue-600/30 placeholder-white/60 text-white focus:border-embassy-blue-500' 
                        />
                    </InputGroup>
                }
            </motion.div>
        </AnimatePresence>

    )
}

export default SearchBar


const CollapsedSearchBar = () => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    variant="outline"
                    color="secondary"

                    fullWidth

                    className="h-10 w-14 mx-auto p-0 md:p-0 bg-embassy-blue-800/30 border-embassy-blue-600/30 hover:bg-embassy-blue-700/40 ring-offset-sidebar"
                >
                    <Search className='h-4 w-4 text-white' />
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className='bg-white/95 backdrop-blur-sm border-embassy-blue-200 dark:bg-slate-800/95 dark:border-embassy-blue-600/30 border-sidebar '>
                <InputGroup merged >
                    <InputGroupText className='bg-embassy-blue-800/30 border-embassy-blue-600/30 group-focus-within:border-embassy-blue-500'>
                        <Search className='h-4 w-4 text-white' />
                    </InputGroupText>
                    <Input 
                        type="text" 
                        placeholder="Search Menu..." 
                        className='bg-embassy-blue-800/20 border-embassy-blue-600/30 placeholder-white/60 text-white focus:border-embassy-blue-500' 
                    />
                </InputGroup>
            </HoverCardContent>
        </HoverCard>
    )
}
