/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX, PropsWithChildren } from 'react';
import { FocusScope } from 'react-aria';
import { useNavbarStore } from '@/stores/navbar-store';

/**
 * Focus management provider wrapper utilizing React Aria's `FocusScope`.
 * Automatically moves keyboard focus into the active megamenu overlay upon expansion,
 * restores focus back to the triggering navbar item on close, and resets focus scope on item change via keying.
 *
 * @param props - Children nodes to enclose within the focus scope boundary.
 * @returns The focus-managed React element scope.
 */
export const FocusProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;

	const openedItem = useNavbarStore((s) => s.openedItem);

	return (
		<FocusScope key={openedItem} autoFocus restoreFocus contain={false}>
			{children}
		</FocusScope>
	);
};
