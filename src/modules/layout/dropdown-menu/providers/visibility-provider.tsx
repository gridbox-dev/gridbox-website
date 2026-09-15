/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX, PropsWithChildren } from 'react';
import { useNavbarStore } from '@/stores/navbar-store';
import { usePopupStore } from '@/stores/popup-store';

/**
 * Conditional mounting boundary component that evaluates active megamenu and global popup state.
 * Returns `null` when no header dropdown is active to keep the DOM unmounted and clean.
 *
 * @param props - Children nodes to conditionally mount defined by {@link PropsWithChildren}.
 * @returns The rendered children fragment when the header dropdown is active, or `null` if closed.
 */
export const VisibilityProvider = (props: PropsWithChildren): JSX.Element | null => {
	const { children } = props;

	const openedItem = useNavbarStore((s) => s.openedItem);
	const openedPopup = usePopupStore((s) => s.openedPopup);

	const isDropdownOpen = openedPopup === 'header-nav-dropdown' && openedItem;

	if (!isDropdownOpen) return null;

	return <>{children}</>;
};
