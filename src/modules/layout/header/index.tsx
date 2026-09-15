/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import type { InferDictionary } from '@/config/i18n';
import { Actions } from '@/modules/layout/header/components/actions/actions';
import { Navbar } from '@/modules/layout/header/components/navigation/navbar';
import { RootHeader } from '@/modules/layout/header/components/root/root-header';
import { RootWrapper } from '@/modules/layout/header/components/root/root-wrapper';
import { MotionProvider } from '@/modules/layout/header/providers/motion-provider';
import type { BaseComponent } from '@/types/components';
import { DropdownMenu } from '../dropdown-menu';

export interface HeaderProps extends BaseComponent {
	content: InferDictionary<'header'>;
}

export const Header = (props: HeaderProps): JSX.Element => {
	const { content, dark } = props;

	return (
		<MotionProvider>
			<RootWrapper>
				<RootHeader dark={dark} id='root-header'>
					<Navbar content={content.navbar} />
					<Actions content={content.actions} />
				</RootHeader>

				{/* The dropdown menus should go here */}
				<DropdownMenu />
			</RootWrapper>
		</MotionProvider>
	);
};
