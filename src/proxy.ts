/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import type { Language } from '@/types/common/i18n';

const SUPPORTED_LOCALES: ReadonlyArray<Language> = ['es', 'en'];
const DEFAULT_LOCALE: Language = 'es';

/**
 * Extracts and negotiates the preferred locale from the user's request headers.
 * @param req - The incoming Next.js request object.
 * @returns The best matching supported locale string or the default locale as fallback.
 */
function getLocale(req: NextRequest): string {
	const headers = Object.fromEntries(req.headers.entries());
	const languages = new Negotiator({ headers }).languages();

	try {
		return match(languages, [...SUPPORTED_LOCALES], DEFAULT_LOCALE);
	} catch {
		return DEFAULT_LOCALE;
	}
}

/**
 * Validates whether a given pathname already includes a supported locale prefix.
 * @param pathname - The URL pathname to validate.
 * @returns true if the pathname includes a supported locale prefix, otherwise false.
 */
function validatePathname(pathname: string): boolean {
	return SUPPORTED_LOCALES.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);
}

/**
 * Intercepts incoming requests and verifies if a locale prefix is present. If missing,
 * negotiates the user's preferred language and redirects to the localized path.
 * @param req - The incoming Next.js request object.
 * @returns A redirect if the URL lacks a locale prefix, or undefined to proceed.
 */
function middleware(req: NextRequest): NextResponse | undefined {
	const { pathname } = req.nextUrl;

	const hasLocale = validatePathname(pathname);
	if (hasLocale) return;

	const locale = getLocale(req);

	req.nextUrl.pathname = `/${locale}${pathname}`;
	return NextResponse.redirect(req.nextUrl);
}

/**
 * Middleware configuration object excluding static assets, API endpoints,
 * images and public metadata files.
 */
export const config = {
	matcher: [
		'/((?!api|_next/static|socket|_next/image|assets|opengraph-image.jpg|images|favicons|manifest.json|favicon.ico|sw.js|site.webmanifest).*)',
	],
};

export default middleware;
