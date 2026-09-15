/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { FocusProvider } from '@/modules/layout/dropdown-menu/providers/focus-provider';
import { MotionProvider } from '@/modules/layout/dropdown-menu/providers/motion-provider';
import { VisibilityProvider } from '@/modules/layout/dropdown-menu/providers/visibility-provider';
import type { BaseComponent } from '@/types/components';

export interface DropdownMenuProps extends BaseComponent {}

export const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
	const { dark: _dark } = props;

	return (
		<VisibilityProvider>
			<FocusProvider>
				<MotionProvider>
					<div>Full-width dropdown menu</div>
				</MotionProvider>
			</FocusProvider>
		</VisibilityProvider>
	);
};
