/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { env } from '.';
import { createEnv } from './env-creation';

/**
 * Unit test suite for the environment validation helper function.
 */
describe('createEnv', () => {
	/**
	 * Tests successful parsing and type inference when valid environment variables are provided.
	 */
	it('should successfully parse valid environment variables', () => {
		const schema = z.object({
			baseURL: z.url(),
			isProduction: z.boolean(),
		});

		const definition = {
			baseURL: 'http://localhost:3000',
			isProduction: true,
		};

		const env = createEnv(schema, definition);

		expect(env.baseURL).toBe('http://localhost:3000');
		expect(env.isProduction).toBe(true);
	});

	/**
	 * Tests that Zod schema validation errors are thrown when invalid environment variables are supplied.
	 */
	it('should throw an error when validation fails', () => {
		const schema = z.object({
			baseURL: z.url(),
		});

		const invalidDefinition = {
			baseURL: 'invalid-url',
		};

		expect(() => createEnv(schema, invalidDefinition)).toThrow();
	});

	/**
	 * Tests runtime immutability by verifying that the returned object is frozen and throws on modification attempts.
	 */
	it('should return a frozen, immutable object', () => {
		const schema = z.object({
			nodeEnv: z.string(),
		});

		const env = createEnv(schema, { nodeEnv: 'development' });

		expect(Object.isFrozen(env)).toBe(true);

		expect(() => {
			// @ts-expect-error - Testing runtime immutability
			env.nodeEnv = 'production';
		}).toThrow();
	});
});

/**
 * Integration test suite for the main exported `env` application configuration object.
 */
describe('env integration', () => {
	/**
	 * Verifies that the exported `env` object contains both server and client properties.
	 */
	it('should successfully expose merged server and client properties', () => {
		expect(env).toBeDefined();
		expect(env.nodeEnv).toBeDefined();
		expect(typeof env.isProduction).toBe('boolean');
	});

	/**
	 * Verifies that the top-level merged `env` object is frozen to prevent runtime tampering.
	 */
	it('should be frozen at the top level', () => {
		expect(Object.isFrozen(env)).toBe(true);

		expect(() => {
			// @ts-expect-error - Testing runtime immutability on exported singleton
			env.nodeEnv = 'production';
		}).toThrow();
	});
});
