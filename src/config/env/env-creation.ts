/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { ZodType } from 'zod';

/**
 * Validates and freezes an environment configuration object using a Zod schema.
 * @template T - The inferred type of the validated environment configuration.
 * @param schema - The Zod schema used to validate the environment definition.
 * @param definition - The raw environment key-value pairs to parse.
 * @returns A deeply immutable, validated environment configuration object.
 * @throws {ZodError} If the provided definition fails schema validation.
 */
export function createEnv<T>(schema: ZodType<T>, definition: unknown): Readonly<T> {
	return Object.freeze(schema.parse(definition));
}
