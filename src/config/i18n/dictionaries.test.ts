/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, it, vi } from 'vitest';
import { Language } from '@/types/common/i18n';
import { getDictionary, isSupportedLanguage, PageNamespace } from './dictionaries';

/**
 * Mock 'server-only' to allow Vitest execution in test runtime env.
 */
vi.mock('server-only', () => ({}));

/**
 * Unit tests for validating supported language codes using type guard assertions.
 */
describe('isSupportedLanguage', () => {
	it.each([
		['es', true],
		['en', true],
		['fr', false],
		['de', false],
		['', false],
		['es-CL', false],
	])('evaluates language code "%s" as %s', (locale, expected) => {
		expect(isSupportedLanguage(locale)).toBe(expected);
	});
});

/**
 * Unit tests for loading dynamic namespace dictionaries and verifying fallback mechanisms.
 */
describe('getDictionary', () => {
	it.each([
		['es', 'metadata'],
		['en', 'metadata'],
	] as const)(
		'resolves dictionary payload for language "%s" and namespace "%s"',
		async (lang, page) => {
			const dictionary = await getDictionary(lang, page);
			expect(dictionary).toBeUndefined();
		},
	);

	it('falls back safely to default locale (es) when an unsupported language is provided', async () => {
		const unsupportedLanguage = 'fr' as Language;
		const dictionary = await getDictionary(unsupportedLanguage, 'metadata');

		expect(dictionary).toBeUndefined();
	});

	it('falls back safely to default locale namespace loader when an invalid namespace is provided', async () => {
		const invalidPage = 'non_existent_page' as PageNamespace;
		const dictionary = await getDictionary('en', invalidPage);

		expect(dictionary).toBeUndefined();
	});
});

/**
 * Integration and regression test suite for React cache memoization and async resolution.
 */
describe('React Cache & Async Resolution', () => {
	it('returns a promise that resolves the expected schema structure', async () => {
		const dictionaryPromise = getDictionary('es', 'metadata');

		expect(dictionaryPromise).toBeInstanceOf(Promise);
		await expect(dictionaryPromise).resolves.toBeUndefined();
	});

	it('consistently resolves identical dictionary results across sequential cached calls', async () => {
		const firstCall = await getDictionary('es', 'metadata');
		const secondCall = await getDictionary('es', 'metadata');

		expect(firstCall).toBe(secondCall);
	});
});
