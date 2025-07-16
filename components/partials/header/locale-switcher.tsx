'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { locales } from '@/config';
import { usePathname, useRouter } from '@/i18n/routing';

import { useTransition } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';

export default function LocalSwitcher() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const localActive = useLocale();

    const onSelectChange = (nextLocale: string) => {
        startTransition(() => {

            router.replace(pathname, { locale: nextLocale });
        });
    };
    return (
        <Select onValueChange={onSelectChange} defaultValue={localActive}>
            <SelectTrigger className='w-[94px] border-none read-only:bg-embassy-blue-100 hover:bg-embassy-blue-200 rounded-lg transition-all duration-200 cursor-pointer dark:read-only:bg-embassy-blue-800/30 dark:hover:bg-embassy-blue-700/40'>
                <SelectValue className='text-embassy-blue-700 dark:text-embassy-blue-300 font-medium' placeholder="Chosissez une langue" />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-sm border border-embassy-blue-200 shadow-xl dark:bg-slate-800/95 dark:border-embassy-blue-400/30">
                <SelectItem value="fr" className="hover:bg-embassy-blue-50 rounded-lg transition-colors duration-200 dark:hover:bg-embassy-blue-800/30">
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image
                            src="/images/all-img/flag-3.png"
                            alt='flag'
                            width={24}
                            height={24}
                            className='w-6 h-6 rounded-full border border-embassy-blue-200 dark:border-embassy-blue-600'
                        />
                        <span className='font-medium text-sm text-embassy-blue-700 dark:text-embassy-blue-300'>FR</span>
                    </div>
                </SelectItem>
                <SelectItem value="en" className="hover:bg-embassy-blue-50 rounded-lg transition-colors duration-200 dark:hover:bg-embassy-blue-800/30">
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image
                            src="/images/all-img/flag-1.png"
                            alt='flag'
                            width={24}
                            height={24}
                            className='w-6 h-6 rounded-full border border-embassy-blue-200 dark:border-embassy-blue-600'
                        />
                        <span className='font-medium text-sm text-embassy-blue-700 dark:text-embassy-blue-300'>EN</span>
                    </div>
                </SelectItem>
                <SelectItem value="ar" className="hover:bg-embassy-blue-50 rounded-lg transition-colors duration-200 dark:hover:bg-embassy-blue-800/30">
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <Image
                            src="/images/all-img/flag-2.png"
                            alt='flag'
                            width={24}
                            height={24}
                            className='w-6 h-6 rounded-full border border-embassy-blue-200 dark:border-embassy-blue-600'
                        />
                        <span className='font-medium text-sm text-embassy-blue-700 dark:text-embassy-blue-300'>AR</span>
                    </div>
                </SelectItem>
                
            </SelectContent>
        </Select>

    );
}