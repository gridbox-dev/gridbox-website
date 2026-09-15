/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { RootWrapper } from '@/modules/layout/dropdown-menu/components/root/root-wrapper';
import { FocusProvider } from '@/modules/layout/dropdown-menu/providers/focus-provider';
import { MotionProvider } from '@/modules/layout/dropdown-menu/providers/motion-provider';
import { VisibilityProvider } from '@/modules/layout/dropdown-menu/providers/visibility-provider';
import type { BaseComponent } from '@/types/components';

export interface DropdownMenuProps extends BaseComponent {}

export const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
	const { dark } = props;

	return (
		<VisibilityProvider>
			<FocusProvider>
				<MotionProvider>
					<RootWrapper dark={dark} id='root-dropdown-menu'>
						Full-width dropdown menu
					</RootWrapper>
				</MotionProvider>
			</FocusProvider>
		</VisibilityProvider>
	);
};
