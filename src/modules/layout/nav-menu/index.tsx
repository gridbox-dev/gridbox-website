/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { FocusScope } from 'react-aria';
import type { InferDictionary } from '@/config/i18n';
import { usePopupStore } from '@/stores/popup-store';
import type { BaseComponent } from '@/types/components';
import { useHeaderNavStore } from '../header/stores/header-nav-store';
import { NavMenuItemIcon } from './components/nav-menu-item-icon';
import { NavMenuItemText } from './components/nav-menu-item-text';
import { NavMenuLinksBlock } from './components/nav-menu-links-block';
import { NavMenuWrapper } from './components/nav-menu-wrapper';
import { SERVICES_ICONS_MAP, type ServiceIconKey } from './constants/services-icons';

export interface NavMenuProps extends BaseComponent {
	content: InferDictionary<'header'>['links'];
}

export const NavMenu = (props: NavMenuProps): JSX.Element | null => {
	const { dark, content } = props;
	const { services } = content;

	const openedPopup = usePopupStore((s) => s.openedPopup);
	const openedItem = useHeaderNavStore((s) => s.openedItem);

	if (openedPopup !== 'header-nav-dropdown' || !openedItem) return null;

	return (
		<FocusScope key={openedItem} autoFocus restoreFocus contain={false}>
			<NavMenuWrapper dark={dark}>
				{openedItem === 'services' &&
					Object.entries(services.blocks).map(([key, group]) => (
						<NavMenuLinksBlock key={key} label={group.label}>
							{group.items.map((item) => {
								const IconComponent = SERVICES_ICONS_MAP[item.key as ServiceIconKey];

								return (
									<NavMenuLinksBlock.Item
										key={item.key}
										href={item.href}
										aria-label={item.ariaLabel}
										icon={<NavMenuItemIcon icon={IconComponent} />}
									>
										<NavMenuItemText highlight>{item.title}</NavMenuItemText>
										<NavMenuItemText>{item.description}</NavMenuItemText>
									</NavMenuLinksBlock.Item>
								);
							})}
						</NavMenuLinksBlock>
					))}
			</NavMenuWrapper>
		</FocusScope>
	);
};
