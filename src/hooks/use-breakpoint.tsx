/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useEffect, useState } from 'react';
import { resolveBreakpoint } from '@/handlers/client/resolve-breakpoint';
import { resolveDevice } from '@/handlers/client/resolve-device';
import type { Breakpoint, Device } from '@/types/layout';
import { useMediaQuery } from './use-media-query';

/**
 * Return type definition for the {@link useBreakpoint} hook.
 */
export interface UseBreakpointReturn {
	/**
	 * The active layout breakpoint token based on viewport width.
	 * @default 'desktop'
	 */
	breakpoint: Breakpoint;

	/**
	 * Simplified device category for coarse responsive layout decisions.
	 * @default 'desktop'
	 */
	device: Device;

	/**
	 * Whether the layout state has synchronized with client hydration.
	 * @default false
	 */
	isHydrated: boolean;
}

/**
 * Media query matching thresholds following design system's Tailwind CSS scale.
 */
const MEDIA_QUERIES = {
	mobile: '(max-width: 767px)',
	tablet: '(min-width: 768px) and (max-width: 1279px)',
	laptop: '(min-width: 1280px) and (max-width: 1439px)',
} as const;

/**
 * High-level layout hook to observe design system breakpoints in Next.js App Router.
 * Composes low-level media queries and ensures SSR-safe client hydration.
 *
 * @returns The current {@link UseBreakpointReturn} state object.
 */
export const useBreakpoint = (): UseBreakpointReturn => {
	const [isHydrated, setIsHydrated] = useState<boolean>(false);

	const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
	const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
	const isLaptop = useMediaQuery(MEDIA_QUERIES.laptop);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	const breakpoint = isHydrated ? resolveBreakpoint(isMobile, isTablet, isLaptop) : 'desktop';
	const device = resolveDevice(breakpoint);

	return { breakpoint, device, isHydrated };
};
