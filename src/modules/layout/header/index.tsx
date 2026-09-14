/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { MenuButton } from '@/components/ui/menu-button';
import type { InferDictionary } from '@/config/i18n';
import { NavMenu } from '@/modules/layout/nav-menu';
import type { BaseComponent } from '@/types/components';
import { HeaderActions } from './components/header-actions';
import { HeaderAnimationProvider } from './components/header-animation-provider';
import { HeaderContainer } from './components/header-container';
import { HeaderNav } from './components/header-nav';
import { HeaderWrapper } from './components/header-wrapper';
import type { OpenedItem } from './stores/header-nav-store';

export interface HeaderProps extends BaseComponent {
	content: InferDictionary<'header'>;
}

export const Header = (props: HeaderProps): JSX.Element => {
	const { content, dark } = props;
	const { actions, links } = content;

	return (
		<HeaderAnimationProvider>
			<HeaderWrapper id='root-header' dark={dark} data-animate='header'>
				<HeaderContainer>
					<HeaderNav>
						{Object.entries(links).map(([key, item]) => {
							const itemKey = key as OpenedItem;
							const href = 'href' in item ? item.href : undefined;
							const type = href ? 'a' : 'button';

							return (
								<HeaderNav.Item key={itemKey} as={type} id={itemKey} href={href}>
									{item.label}
								</HeaderNav.Item>
							);
						})}
					</HeaderNav>

					<HeaderActions>
						<LanguageSwitcher aria-label={actions.language.ariaLabel} />

						<HeaderActions.CTA hierarchy='conversion' aria-label={actions.conversion.ariaLabel}>
							{actions.conversion.label}
						</HeaderActions.CTA>

						<HeaderActions.CTA hierarchy='scheduling' aria-label={actions.scheduling.ariaLabel}>
							{actions.scheduling.label}
						</HeaderActions.CTA>

						<MenuButton aria-label={actions.mobileMenu.ariaLabel} />
					</HeaderActions>
				</HeaderContainer>

				<NavMenu dark={dark} content={links} />
			</HeaderWrapper>
		</HeaderAnimationProvider>
	);
};
