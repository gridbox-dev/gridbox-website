/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

// docs/env-variables.md

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

/**
 * Validated application environment variables configuration.
 * Encapsulates type-safe runtime access for both server-side and client-side
 * environments schemas using {@link createEnv} and Zod validation rules.
 */
export const env = createEnv({
	/**
	 * Server-side environment variables schema.
	 * These variables are restricted exclusively to the server runtime environment.
	 */
	server: {
		/**
		 * Execution environment mode indicator.
		 * Defines the current deployment cycle state.
		 * @default 'development'
		 */
		NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
	},

	/**
	 * Client-side environment variables schema.
	 * Exposed to the browser runtime using the `NEXT_PUBLIC_` prefix convention.
	 */
	client: {
		/**
		 * The base canonical URL for the web application instance.
		 * Must represent a strictly valid HTTP/HTTPS URL string format.
		 */
		NEXT_PUBLIC_APP_BASE_URL: z.url().refine((url) => url.startsWith('http://') || url.startsWith('https://')),
	},

	/**
	 * Shared environment variables schema.
	 * Accessible across both client and server runtime execution boundaries.
	 */
	shared: {
		/**
		 * Flag indicating whether the application is running in production mode.
		 * Dynamically derived based on the runtime evaluation of `NODE_ENV`.
		 * @default false
		 */
		IS_PRODUCTION: z.boolean().default(false),
	},

	/**
	 * Runtime environment bindings mapping process variables to defined schemas.
	 * Resolves process values for both server execution and Next.js client bundle injection.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		IS_PRODUCTION: process.env.NODE_ENV === 'production',
		NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
	},
});
