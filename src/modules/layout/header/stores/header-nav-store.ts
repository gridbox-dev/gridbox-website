/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Type representing the identifier of the currently expanded header navigation item.
 */
type OpenedItem = string | undefined;

/**
 * State properties interface for the header navigation Zustand store.
 */
export interface HeaderNavStoreStateProps {
	/**
	 * Unique string identifier of the active open menu item, or `undefined` if all items are collapsed.
	 */
	openedItem: OpenedItem;
}

/**
 * Complete store interface combining state values and action methods for header navigation management.
 */
export interface HeaderNavStoreProps extends HeaderNavStoreStateProps {
	/**
	 * Toggles the expanded state of a target menu item.
	 * Collapses the item if it is currently open, or sets it as the active item.
	 *
	 * @param item - The string identifier of the navigation item to toggle.
	 */
	toggle: (item: OpenedItem) => void;
}

/**
 * Custom Zustand hook for managing header dropdowns and mobile menu state.
 * Configured with DevTools middleware for state debugging.
 */
export const useHeaderNavStore = create<HeaderNavStoreProps>()(
	devtools(
		(set) => ({
			openedItem: undefined,
			toggle: (item) =>
				set(
					(state) => ({
						openedItem: state.openedItem === item ? undefined : item,
					}),
					false,
					'ui/toggle-header-item',
				),
		}),
		{ name: 'Header Navigation Store' },
	),
);
