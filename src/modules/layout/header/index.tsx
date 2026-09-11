/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { MenuButton } from '@/components/ui/menu-button';
import type { BaseComponent } from '@/types/components';
import { HeaderActions } from './components/header-actions';
import { HeaderAnimationProvider } from './components/header-animation-provider';
import { HeaderContainer } from './components/header-container';
import { HeaderNavigation } from './components/header-navigation';
import { HeaderWrapper } from './components/header-wrapper';

export interface HeaderProps extends BaseComponent {}

export const Header = (props: HeaderProps): JSX.Element => {
	const { dark } = props;

	return (
		<HeaderAnimationProvider>
			<HeaderWrapper id='root-header' dark={dark} data-animate='header'>
				<HeaderContainer>
					<HeaderNavigation>Root header navigation</HeaderNavigation>

					<HeaderActions>
						<HeaderActions.CTA hierarchy='scheduling'>Agendar reunión</HeaderActions.CTA>
						<HeaderActions.CTA hierarchy='conversion'>Solicitar presupuesto</HeaderActions.CTA>
						<LanguageSwitcher />
						<MenuButton />
					</HeaderActions>
				</HeaderContainer>
			</HeaderWrapper>
		</HeaderAnimationProvider>
	);
};
