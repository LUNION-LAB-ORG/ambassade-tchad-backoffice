import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales } from '@/config';


export const routing = defineRouting({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);


