/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import type { InferDictionary } from '@/config/i18n';
import { tv } from '@/config/ui/tw-variants';
import { useNavbarStore } from '@/stores/navbar-store';
import { ServicesBlock } from './services-block';

const styles = tv({
	slots: {
		base: 'flex flex-col gap-24 h-fit w-full',
	},
});

export interface ServicesMenuProps
	extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className' | 'children' | 'content'> {
	content: InferDictionary<'header'>['menu']['services'];
}

export const ServicesMenu = (props: ServicesMenuProps): JSX.Element | null => {
	const { content, ...rest } = props;
	const { base } = styles();

	const isServicesOpen = useNavbarStore((s) => s.openedItem === 'services');
	if (!isServicesOpen) return null;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-menu='services-menu-container' className={base()}>
			{Object.entries(content).map(([key, value]) => (
				<ServicesBlock key={key} label={value.label} links={value.links} />
			))}
		</Box>
	);
};
