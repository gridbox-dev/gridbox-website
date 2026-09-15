/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Valid megamenu category keys capable of expanding an active overlay panel.
 */
export type NavbarOpenedItem = 'services' | 'industries' | 'company';

/**
 * State properties held within the navbar navigation store.
 */
export interface NavbarStoreStateProps {
	/**
	 * Currently expanded navigation item key, or `undefined` if all megamenus are closed.
	 * @default undefined
	 */
	openedItem: NavbarOpenedItem | undefined;
}

/**
 * Interactive actions provided by the navbar navigation store.
 */
export interface NavbarStoreProps extends NavbarStoreStateProps {
	/**
	 * Toggles a megamenu item open or closed based on its current active state.
	 * @param item - The navbar item key to toggle.
	 */
	toggle: (item: NavbarOpenedItem | undefined) => void;
}

/**
 * Zustand global store for managing active header megamenu panels, keyboard accessibility states, and overlay toggles.
 */
export const useNavbarStore = create<NavbarStoreProps>()(
	devtools(
		(set) => ({
			openedItem: undefined,
			toggle: (item) =>
				set(
					(state) => ({
						openedItem: state.openedItem === item ? undefined : item,
					}),
					false,
					'ui/toggle-navbar-item',
				),
		}),
		{ name: 'Navbar Store' },
	),
);
