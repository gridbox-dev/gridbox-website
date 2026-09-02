/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

// docs/i18n.md

import type { Language, LocaleCookie } from '@/types/i18n';

/**
 * Supported locales in the application.
 */
export const SUPPORTED_LOCALES: ReadonlyArray<Language> = ['es', 'en'] as const;

/**
 * Fallback locale used when no matching preferred language is found.
 */
export const DEFAULT_LOCALE: Language = 'es';

/**
 * Persisted locale cookie configuration.
 */
export const LOCALE_COOKIE_CONFIG: LocaleCookie = {
	name: 'NEXT_LOCALE',
	maxAge: 31536000,
} as const;
