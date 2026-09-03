/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { Breakpoint } from '@/types/layout';

/**
 * Resolves the active {@link Breakpoint} token based on matched media flags.
 *
 * @param isMobile - Whether max-width 767px matches.
 * @param isTablet - Whether 768px-1279px matches.
 * @param isLaptop - Whether 1280px-1439px matches.
 * @returns The resolved active breakpoint token.
 */
export const resolveBreakpoint = (isMobile: boolean, isTablet: boolean, isLaptop: boolean): Breakpoint => {
	if (isMobile) return 'mobile';
	if (isTablet) return 'tablet';
	if (isLaptop) return 'laptop';
	return 'desktop';
};
