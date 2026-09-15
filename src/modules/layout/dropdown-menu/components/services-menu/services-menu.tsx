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
import { ServicesBlock } from '@/modules/layout/dropdown-menu/components/services-menu/services-block';
import { useNavbarStore } from '@/stores/navbar-store';

const styles = tv({
	base: 'flex flex-col gap-24 h-fit w-full',
});

/**
 * Properties for the {@link ServicesMenu} panel component.
 * Extends base primitive `div` props while omitting layout-breaking properties
 * in favor of a strictly-typed localized content dictionary.
 */
export interface ServicesMenuProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children' | 'content'> {
	/**
	 * Localized dictionary section containing all service categories and their associated links.
	 */
	content: InferDictionary<'header'>['menu']['services'];
}

/**
 * Services content panel for the megamenu overlay.
 * Reads the active navigation item state from {@link useNavbarStore} and renders
 * the corresponding service category blocks when active.
 *
 * @param props - Component configuration options defined by {@link ServicesMenuProps}.
 * @returns The rendered services menu container node when active, or `null` if closed.
 */
export const ServicesMenu = (props: ServicesMenuProps): JSX.Element | null => {
	const { content, className, ...rest } = props;

	const isServicesOpen = useNavbarStore((s) => s.openedItem === 'services');
	if (!isServicesOpen) return null;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-menu='services-menu-container' className={styles({ className })}>
			{Object.entries(content).map(([key, value]) => (
				<ServicesBlock key={key} label={value.label} links={value.links} />
			))}
		</Box>
	);
};
