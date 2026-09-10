/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import type { BaseComponent } from '@/types/components';
import { HeaderWrapper } from './components/header-wrapper';

export interface HeaderProps extends BaseComponent {}

export const Header = (props: HeaderProps): JSX.Element => {
	const { dark } = props;

	return (
		<HeaderWrapper id='root-header' dark={dark}>
			Root header navigation
		</HeaderWrapper>
	);
};
