/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { NextRequest } from 'next/server';
import { describe, expect, it } from 'vitest';
import middleware, {
	extractLocaleFromPath,
	handleExistingLocalePath,
	handleMissingLocalePath,
	negotiateHeaderLocale,
	readLocaleFromCookie,
	resolvePreferredLocale,
} from './proxy';

/**
 * Creates a mock Next.js request instance initialized with custom cookies and headers.
 * @param path - The target pathname for the mock URL.
 * @param options - Optional configuration object containing request cookies and headers.
 * @param options.cookies - Key-value map representing client cookies.
 * @param options.headers - Key-value map representing HTTP request headers.
 * @returns
 */
function createMockRequest(
	path: string,
	options: { cookies?: Record<string, string>; headers?: Record<string, string> } = {},
): NextRequest {
	const url = new URL(path, 'http://localhost:3000');
	const req = new NextRequest(url);

	if (options.cookies) {
		for (const [key, value] of Object.entries(options.cookies)) {
			req.cookies.set(key, value);
		}
	}

	if (options.headers) {
		for (const [key, value] of Object.entries(options.headers)) {
			req.headers.set(key, value);
		}
	}

	return req;
}

/**
 * Unit tests for extracting supported locale segments from URL pathnames.
 */
describe('extractLocaleFromPath', () => {
	it.each([
		['/es/dashboard', 'es'],
		['/en', 'en'],
		['/fr/dashboard', undefined],
		['/about', undefined],
		['/', undefined],
	])('extracts path "%s" as %s', (path, expected) => {
		expect(extractLocaleFromPath(path)).toBe(expected);
	});
});

/**
 * Unit tests for reading and validating locale values stored in request cookies.
 */
describe('readLocaleFromCookie', () => {
	it.each([
		[{ cookies: { NEXT_LOCALE: 'en' } }, 'en'],
		[{}, undefined],
		[{ cookies: { NEXT_LOCALE: 'fr' } }, undefined],
	])('resolves cookie state %j to %s', (options, expected) => {
		expect(readLocaleFromCookie(createMockRequest('/', options))).toBe(expected);
	});
});

/**
 * Unit tests for negotiating preferred locales based on HTTP Accept-Language headers.
 */
describe('negotiateHeaderLocale', () => {
	it.each([
		[{ headers: { 'accept-language': 'en-US,en;q=0.8' } }, 'en'],
		[{}, 'es'],
		[{ headers: { 'accept-language': 'de-DE,de;q=0.9' } }, 'es'],
	])('negotiates header state %j to %s', (options, expected) => {
		expect(negotiateHeaderLocale(createMockRequest('/', options))).toBe(expected);
	});

	it('returns default locale when accept-language header contains malformed BCP 47 tags', () => {
		const req = createMockRequest('/', {
			headers: { 'accept-language': 'invalid_tag!@#$%' },
		});

		expect(negotiateHeaderLocale(req)).toBe('es');
	});
});

/**
 * Unit tests for preferred locale resolution hierarchy.
 */
describe('resolvePreferredLocale', () => {
	it.each([
		[
			{ cookies: { NEXT_LOCALE: 'en' }, headers: { 'accept-language': 'es-ES,es;q=0.9' } },
			'en',
		],
		[{ headers: { 'accept-language': 'en-US,en;q=0.9' } }, 'en'],
	])('resolves preferred locale for %j as %s', (options, expected) => {
		expect(resolvePreferredLocale(createMockRequest('/', options))).toBe(expected);
	});
});

/**
 * Unit tests for request handling when a supported locale prefix is already present in the URL.
 */
describe('handleExistingLocalePath', () => {
	it('syncs cookie on mismatch and skips when aligned', () => {
		const mismatchReq = createMockRequest('/en/dashboard', { cookies: { NEXT_LOCALE: 'es' } });
		const alignedReq = createMockRequest('/es/dashboard', { cookies: { NEXT_LOCALE: 'es' } });

		expect(
			handleExistingLocalePath(mismatchReq, 'en')?.cookies.get('NEXT_LOCALE')?.value,
		).toBe('en');
		expect(handleExistingLocalePath(alignedReq, 'es')).toBeUndefined();
	});
});

/**
 * Unit tests for request handling when a locale prefix is missing from the URL.
 */
describe('handleMissingLocalePath', () => {
	it('redirects with preferred locale and updates cookie', () => {
		const req = createMockRequest('/dashboard', { cookies: { NEXT_LOCALE: 'en' } });
		const res = handleMissingLocalePath(req);

		expect(res.status).toBe(307);
		expect(res.headers.get('location')).toBe('http://localhost:3000/en/dashboard');
		expect(res.cookies.get('NEXT_LOCALE')?.value).toBe('en');
	});
});

/**
 * Integration test suite for the main middleware orchestrator.
 */
describe('Middleware Orchestrator Integration', () => {
	it('redirects unlocalized path to preferred locale path', () => {
		const req = createMockRequest('/about');
		const res = middleware(req);

		expect(res?.status).toBe(307);
		expect(res?.headers.get('location')).toBe('http://localhost:3000/es/about');
	});

	it('passes through and updates cookie when visiting different locale directly', () => {
		const req = createMockRequest('/en/about', { cookies: { NEXT_LOCALE: 'es' } });
		const res = middleware(req);

		expect(res?.status).toBe(200);
		expect(res?.cookies.get('NEXT_LOCALE')?.value).toBe('en');
	});

	it('returns undefined to proceed when path locale matches cookie', () => {
		const req = createMockRequest('/es/about', { cookies: { NEXT_LOCALE: 'es' } });
		const res = middleware(req);

		expect(res).toBeUndefined();
	});
});

/**
 * Test suite covering strict edge cases, query parameter preservation, and regression prevention.
 */
describe('Strict Edge Cases & Regressions', () => {
	it('preserves query parameters and URL search params during redirection', () => {
		const req = createMockRequest('/products?category=software&sort=asc', {
			cookies: { NEXT_LOCALE: 'en' },
		});

		const res = handleMissingLocalePath(req);

		expect(res.headers.get('location')).toBe(
			'http://localhost:3000/en/products?category=software&sort=asc',
		);
	});

	it('picks secondary supported language in Accept-Language header over default fallback', () => {
		const req = createMockRequest('/', {
			headers: { 'accept-language': 'fr-FR,fr;q=0.9, en-US;q=0.8, es;q=0.5' },
		});

		expect(negotiateHeaderLocale(req)).toBe('en');
	});

	it('handles root path redirection correctly', () => {
		const req = createMockRequest('/');
		const res = middleware(req);

		expect(res?.status).toBe(307);
		expect(res?.headers.get('location')).toBe('http://localhost:3000/es/');
	});
});
