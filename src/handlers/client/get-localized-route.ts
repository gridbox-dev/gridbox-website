/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config/i18n/constants';
import type { Language } from '@/types/i18n';

/**
 * Evaluates the current URL pathname and returns the root path for the active locale (`/es` or `/en`).
 *
 * @param path - The current raw URL path string.
 * @returns The localized root path string.
 */
export const getLocalizedRoot = (pathname: string): string => {
	const segments = pathname.split('/').filter(Boolean);

	const currentLocale = (
		SUPPORTED_LOCALES.includes(segments[0] as Language) ? segments[0] : DEFAULT_LOCALE
	) as Language;

	return `/${currentLocale}`;
};
