/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { Breakpoint, Device } from '@/types/layout';

/**
 * Maps a {@link Breakpoint} token to a coarse {@link Device} classification.
 *
 * @param breakpoint - The active layout breakpoint token.
 * @returns The coarse device category.
 */
export const resolveDevice = (breakpoint: Breakpoint): Device => {
	return breakpoint === 'mobile' || breakpoint === 'tablet' ? 'mobile' : 'desktop';
};
