/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { type JSX, type PropsWithChildren, useEffect, useState } from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useNavbarStore } from '@/stores/navbar-store';
import { usePopupStore } from '@/stores/popup-store';

/**
 * Delay in milliseconds before unmounting children to allow exit animations to complete.
 * Matches the exit animation duration defined in GSAP.
 */
const UNMOUNT_DELAY_MS: number = 280;

/**
 * Conditional mounting boundary component that evaluates active megamenu and global popup state.
 * Returns `null` when no header dropdown is active to keep the DOM unmounted and clean.
 *
 * @param props - Children nodes to conditionally mount defined by {@link PropsWithChildren}.
 * @returns The rendered children fragment when the header dropdown is active, or `null` if closed.
 */
export const VisibilityProvider = (props: PropsWithChildren): JSX.Element | null => {
	const { children } = props;

	const { device, isHydrated } = useBreakpoint();

	const openedItem = useNavbarStore((s) => s.openedItem);
	const openedPopup = usePopupStore((s) => s.openedPopup);

	const isDesktop = isHydrated && device === 'desktop';
	const isDropdownOpen = Boolean(openedPopup === 'header-nav-dropdown' && openedItem);

	const [isVisible, setIsVisible] = useState<boolean>(isDropdownOpen);

	useEffect(() => {
		if (isDropdownOpen) {
			setIsVisible(true);
			return;
		}

		const timer = setTimeout(() => {
			setIsVisible(false);
		}, UNMOUNT_DELAY_MS);

		return () => clearTimeout(timer);
	}, [isDropdownOpen]);

	if (!(isDesktop && isVisible)) return null;

	return <>{children}</>;
};
