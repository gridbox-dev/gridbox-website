/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import type { BaseComponent } from '@/types/components';
import { VisibilityProvider } from './providers/visibility-provider';

export interface DropdownMenuProps extends BaseComponent {}

export const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
	const { dark: _dark } = props;

	return <VisibilityProvider>Dropdown menu</VisibilityProvider>;
};
