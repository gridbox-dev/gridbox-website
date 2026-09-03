/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useEffect, useState } from 'react';

/**
 * Low-level utility hook to observe changes on a raw CSS media query string.
 *
 * @param query - Valid CSS media query string (e.g., '(max-width: 767px)').
 * @returns Boolean indicating if the media query currently matches.
 */
export const useMediaQuery = (query: string): boolean => {
	const [matches, setMatches] = useState<boolean>(false);

	useEffect(() => {
		const media = window.matchMedia(query);

		const updateMatches = (): void => {
			setMatches(media.matches);
		};

		updateMatches();

		media.addEventListener('change', updateMatches);
		return () => {
			media.removeEventListener('change', updateMatches);
		};
	}, [query]);

	return matches;
};
