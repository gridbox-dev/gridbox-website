/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import type { InferDictionary } from '@/config/i18n';
import { RootWrapper } from '@/modules/layout/dropdown-menu/components/root/root-wrapper';
import { ServicesMenu } from '@/modules/layout/dropdown-menu/components/services-menu/services-menu';
import { AutoCloseProvider } from '@/modules/layout/dropdown-menu/providers/autoclose-provider';
import { FocusProvider } from '@/modules/layout/dropdown-menu/providers/focus-provider';
import { MotionProvider } from '@/modules/layout/dropdown-menu/providers/motion-provider';
import { VisibilityProvider } from '@/modules/layout/dropdown-menu/providers/visibility-provider';
import type { BaseComponent } from '@/types/components';

export interface DropdownMenuProps extends BaseComponent {
	content: InferDictionary<'header'>['menu'];
}

export const DropdownMenu = (props: DropdownMenuProps): JSX.Element => {
	const { content, dark } = props;

	return (
		<VisibilityProvider>
			<AutoCloseProvider>
				<FocusProvider>
					<MotionProvider>
						<RootWrapper dark={dark} id='root-dropdown-menu'>
							<ServicesMenu content={content.services} />
						</RootWrapper>
					</MotionProvider>
				</FocusProvider>
			</AutoCloseProvider>
		</VisibilityProvider>
	);
};
