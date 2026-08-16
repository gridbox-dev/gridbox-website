/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { cache } from 'react';
import { DEFAULT_LOCALE } from '@/proxy';
import type { Language } from '@/types/common/i18n';
import 'server-only';

/**
 * Maps each supported language and page namespace to its dynamic JSON loader.
 * Uses satisfies to enforce structural consistency across languages.
 */
const dictionaries = {
	es: {
		dummy: async () => undefined,
	},
	en: {
		dummy: async () => undefined,
	},
} as const satisfies Record<Language, Record<string, () => Promise<unknown>>>;

/**
 * Namespaces available based on the default locale schema.
 */
export type PageNamespace = keyof (typeof dictionaries)[typeof DEFAULT_LOCALE];

/**
 * Infers the return payload structure for a specific namespace.
 */
export type InferDictionary<P extends PageNamespace> = Awaited<
	ReturnType<(typeof dictionaries)[typeof DEFAULT_LOCALE][P]>
>;

/**
 * Type guard to check if a string represents a supported language.
 * @param locale - Language code candidate.
 * @returns True if locale exists as a supported language or false if unsupported.
 */
export const isSupportedLanguage = (locale: string): locale is Language => {
	return locale in dictionaries;
};

/**
 * Asynchronously loads the requested namespace dictionary for a given language.
 * Falls back safely to default locale and namespace if specified target is unavailable.
 * @param lang - Target language locale.
 * @param page - Namespace/Page dictionary to retrieve.
 * @returns Inferred schema payload as a Promise.
 */
export const getDictionary = cache(
	// biome-ignore lint/suspicious/useAwait: Returns the loader Promise directly without an internal await.
	async <P extends PageNamespace>(lang: Language, page: P): Promise<InferDictionary<P>> => {
		const languageLoaders = dictionaries[lang] ?? dictionaries[DEFAULT_LOCALE];
		const pageLoader = languageLoaders[page] ?? dictionaries[DEFAULT_LOCALE][page];

		return pageLoader() as Promise<InferDictionary<P>>;
	},
);
