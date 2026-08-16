/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { z } from 'zod';

/**
 * Contains configuration and secrets that must only be accessible on the server.
 */
export const serverEnvSchema = z.object({
	nodeEnv: z.enum(['development', 'production', 'test']),
	isProduction: z.boolean(),
});

/**
 * Contains non-sensitive configuration exposed to the browser.
 */
export const clientEnvSchema = z.object({
	baseURL: z.url(),
});

/**
 * Inferred Typescript type for the validated server environment variables.
 */
export type ServerEnvSchema = z.infer<typeof serverEnvSchema>;

/**
 * Inferred Typescript type for the validated client environment variables.
 */
export type ClientEnvSchema = z.infer<typeof clientEnvSchema>;
