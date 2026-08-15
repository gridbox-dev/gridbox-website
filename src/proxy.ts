/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type NextRequest, NextResponse } from 'next/server';
import type { Language } from './types/common/i18n';

/** Supported application locales. */
export const SUPPORTED_LOCALES: ReadonlyArray<Language> = ['es', 'en'];

/** Fallback locale used when no matching preferred language is found. */
export const DEFAULT_LOCALE: Language = 'es';

/** Persisted locale cookie configuration. */
export const LOCALE_COOKIE = {
	name: 'NEXT_LOCALE',
	maxAge: 31536000,
} as const;

/**
 * Extracts the locale segment from a given URL pathname if it matches a supported locale.
 * @param pathname - The URL pathname to evaluate.
 * @returns The extracted supported locale or undefined if missing or unsupported.
 */
export function extractLocaleFromPath(pathname: string): Language | undefined {
	const firstSegment = pathname.split('/')[1] as Language;
	return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : undefined;
}

/**
 * Reads and validates the locale stored in the user's request cookies.
 * @param req - The incoming Next.js request object.
 * @returns The validated cookie locale or undefined if missing or unsupported.
 */
export function readLocaleFromCookie(req: NextRequest): Language | undefined {
	const cookieValue = req.cookies.get(LOCALE_COOKIE.name)?.value as Language | undefined;
	return cookieValue && SUPPORTED_LOCALES.includes(cookieValue) ? cookieValue : undefined;
}

/**
 * Negotiates the preferred locale using the 'Accept-Language' request header.
 * @param req - The incoming Next.js request object.
 * @returns The negotiated supported locale string or default locale if missing or unsupported.
 */
export function negotiateHeaderLocale(req: NextRequest): string {
	const acceptLanguage = req.headers.get('accept-language');
	if (!acceptLanguage) return DEFAULT_LOCALE;

	const headers = { 'accept-language': acceptLanguage };
	const languages = new Negotiator({ headers }).languages();

	try {
		return match(languages, [...SUPPORTED_LOCALES], DEFAULT_LOCALE);
	} catch {
		return DEFAULT_LOCALE;
	}
}

/**
 * Resolves the user's preferred locale by checking cookie storage first.
 * @param req - The incoming Next.js request object.
 * @returns The resolved locale string.
 */
export function resolvePreferredLocale(req: NextRequest): string {
	return readLocaleFromCookie(req) ?? negotiateHeaderLocale(req);
}

/**
 * Creates a response that proceeds to the next route while updating the locale cookie.
 * @param locale - The locale string to synchronize in the cookie.
 * @returns A Next.js response configured with the updated cookie.
 */
export function createSyncCookieResponse(locale: Language): NextResponse {
	const response = NextResponse.next();
	response.cookies.set(LOCALE_COOKIE.name, locale, {
		path: '/',
		maxAge: LOCALE_COOKIE.maxAge,
	});

	return response;
}

/**
 * Creates a redirect response pointing to the localized URL path and persists the target locale in cookies.
 * @param req - The incoming Next.js request object.
 * @param targetLocale - The target locale prefix to prepend to the pathname.
 * @returns A Next.js response redirect configured with the localized URL and cookie.
 */
export function createRedirectResponse(req: NextRequest, targetLocale: string): NextResponse {
	const targetURL = new URL(`/${targetLocale}${req.nextUrl.pathname}`, req.url);
	targetURL.search = req.nextUrl.search;

	const response = NextResponse.redirect(targetURL);
	response.cookies.set(LOCALE_COOKIE.name, targetLocale, {
		path: '/',
		maxAge: LOCALE_COOKIE.maxAge,
	});

	return response;
}

/**
 * Handles requests for paths that already include a locale prefix, synchronizing
 * the cookie if the current URL locale differs from the stored preference.
 * @param req - The incoming Next.js request object.
 * @param currentPathLocale - The locale extracted from the current pathname.
 * @returns A cookie synchronization response if the cookie is outdated, otherwise undefined.
 */
export function handleExistingLocalePath(
	req: NextRequest,
	currentPathLocale: Language,
): NextResponse | undefined {
	const cookieLocale = readLocaleFromCookie(req);
	const isCookieOutdated = currentPathLocale !== cookieLocale;

	if (isCookieOutdated) {
		return createSyncCookieResponse(currentPathLocale);
	}

	return undefined;
}

/**
 * Handles requests for paths missing a locale prefix by determining the preferred locale
 * and triggering a localized redirect.
 * @param req - The incoming Next.js request object.
 * @returns A redirect response to the localized URL path.
 */
export function handleMissingLocalePath(req: NextRequest): NextResponse {
	const preferredLocale = resolvePreferredLocale(req);
	return createRedirectResponse(req, preferredLocale);
}

/**
 * Next.js middleware entry point for internationalization routing and cookie synchronization.
 * @param req - The incoming Next.js request object.
 * @returns A response redirecting or updating cookies, or undefined to proceed.
 */
function middleware(req: NextRequest): NextResponse | undefined {
	const { pathname } = req.nextUrl;
	const currentPathLocale = extractLocaleFromPath(pathname);

	if (currentPathLocale) {
		return handleExistingLocalePath(req, currentPathLocale);
	}

	return handleMissingLocalePath(req);
}

/**
 * Middleware configuration object excluding static assets, API endpoints,
 * images and public metadata files.
 */
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\..*).*)'],
};

export default middleware;
