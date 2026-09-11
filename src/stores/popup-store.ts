/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/**
 * Type representing the strict set of registered UI modal and overlay popup identifiers.
 */
type RegisteredPopups = 'mobile-menu' | 'header-nav-dropdown' | 'scheduling-modal' | undefined;

/**
 * State properties interface for the UI popup Zustand store.
 */
export interface PopupStateProps {
	/**
	 * Unique string identifier of the currently active popup overlay, or `undefined` if all overlays are closed.
	 */
	openedPopup: RegisteredPopups;
}

/**
 * Complete store interface combining popup state values and toggle action methods.
 */
export interface PopupStoreProps extends PopupStateProps {
	/**
	 * Toggles the open/closed state of a registered overlay or modal popup.
	 * Closes the popup if it matches the active state, or sets it as the currently active popup.
	 *
	 * @param popup - The target popup identifier to toggle.
	 */
	toggle: (popup: RegisteredPopups) => void;
}

/**
 * Centralized Zustand store for managing global UI overlays, mobile drawers, and modal popups.
 * Includes DevTools middleware integration for debugging state transitions.
 */
export const usePopupStore = create<PopupStoreProps>()(
	devtools(
		(set) => ({
			openedPopup: undefined,

			toggle: (popup) =>
				set(
					(state) => ({
						openedPopup: state.openedPopup === popup ? undefined : popup,
					}),
					false,
					'ui/toggle-popup',
				),
		}),
		{ name: 'Root Popup Store' },
	),
);
