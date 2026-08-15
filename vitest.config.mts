/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
        tsconfigPaths: true,
    },
    test: {
        environment: 'node',
        globals: true,
        coverage: {
			provider: 'v8',
			reporter: ['text', 'json-summary', 'json', 'html'],
		},
    },
});
