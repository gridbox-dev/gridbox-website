/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config/i18n/constants';
import type { Language } from '@/types/i18n';

/**
 * Return type definition for the {@link getAlternateRoute} handler.
 */
export interface GetAlternateRouteReturn {
	/**
	 * The target alternate language locale (`es` or `en`).
	 */
	targetLanguage: Language;

	/**
	 * The fully constructed alternate route URL pathname including query parameters.
	 */
	href: string;
}

/**
 * Computes the alternate localized route by inspecting the given URL path.
 * Toggles the locale prefix between `es` and `en` while preserving nested subpaths and search query parameters.
 *
 * @param path - The raw URL path string to evaluate.
 * @param searchParams - Optional search query string to append to the target URL.
 * @returns An object containing the target language and the formatted alternate route URL.
 */
export const getAlternateRoute = (path: string, searchParams?: string): GetAlternateRouteReturn => {
	const segments = path.split('/').filter(Boolean);

	const currentLocale = (
		SUPPORTED_LOCALES.includes(segments[0] as Language) ? segments[0] : DEFAULT_LOCALE
	) as Language;

	const targetLanguage: Language = currentLocale === 'es' ? 'en' : 'es';

	if (SUPPORTED_LOCALES.includes(segments[0] as Language)) {
		segments[0] = targetLanguage;
	} else {
		segments.unshift(targetLanguage);
	}

	const newPath = `/${segments.join('/')}`;
	const href = searchParams ? `${newPath}?${searchParams}` : newPath;

	return { targetLanguage, href };
};
