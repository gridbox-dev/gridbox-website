/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Return type definition for the {@link useLinkPrefetch} custom hook.
 */
export type UseLinkPrefetchReturn = {
	/**
	 * Event handler function that triggers the router prefetch for the configured route target.
	 */
	handlePrefetch: () => void;
};

/**
 * Custom hook that encapsulates Next.js router route prefetching logic.
 * Provides a memoized callback handler to pre-render targeted route assets on user interactions
 * such as hover, focus, or pointer down events.
 *
 * @param href - Target application route path or URL string conforming to {@link Route}.
 * @returns An object containing the memoized {@link UseLinkPrefetchReturn.handlePrefetch} callback function.
 */
export const useLinkPrefetch = (href: Route | string): UseLinkPrefetchReturn => {
	const { prefetch } = useRouter();

	const handlePrefetch = useCallback(() => {
		if (typeof href === 'string') {
			prefetch(href as Route);
		}
	}, [href, prefetch]);

	return { handlePrefetch };
};
