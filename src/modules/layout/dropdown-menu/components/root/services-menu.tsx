/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { useNavbarStore } from '@/stores/navbar-store';

export interface ServicesMenuProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className' | 'children'> {}

export const ServicesMenu = (props: ServicesMenuProps): JSX.Element | null => {
	const { ...rest } = props;

	const isServicesOpen = useNavbarStore((s) => s.openedItem === 'services');
	if (!isServicesOpen) return null;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-menu='services-menu-container' className=''>
			Services dropdown menu
		</Box>
	);
};
