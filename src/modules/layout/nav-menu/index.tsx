/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { FocusScope } from 'react-aria';
import { usePopupStore } from '@/stores/popup-store';
import type { BaseComponent } from '@/types/components';
import { useHeaderNavStore } from '../header/stores/header-nav-store';
import { NavMenuWrapper } from './components/nav-menu-wrapper';

export interface NavMenuProps extends BaseComponent {}

export const NavMenu = (props: NavMenuProps): JSX.Element | null => {
	const { dark } = props;

	const openedPopup = usePopupStore((s) => s.openedPopup);
	const openedItem = useHeaderNavStore((s) => s.openedItem);

	if (openedPopup !== 'header-nav-dropdown' || !openedItem) return null;

	return (
		<FocusScope key={openedItem} autoFocus restoreFocus contain={false}>
			<NavMenuWrapper dark={dark}>Dropdown Navigation Menu</NavMenuWrapper>
		</FocusScope>
	);
};
