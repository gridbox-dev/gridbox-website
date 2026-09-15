/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { Text } from '@/components/base/text';
import { SERVICES_APP_ROUTES } from '@/config/constants/app-routes';
import type { InferDictionary } from '@/config/i18n';
import { tv } from '@/config/ui/tw-variants';
import { MenuItem } from '@/modules/layout/dropdown-menu/components/menu-item/menu-item';

const styles = tv({
	slots: {
		base: 'flex flex-col gap-8 h-fit w-full',
		text: 'text-copy-14 font-medium text-quaternary',
		list: 'grid grid-cols-3 gap-y-2 gap-x-24 h-fit w-full',
	},
});

/**
 * Shape of an individual dropdown menu link item inferred from the i18n dictionary.
 */
export type DropdownMenuItemLink = InferDictionary<'header'>['menu']['services']['software']['links']['customSoftware'];

/**
 * Flexible link dictionary map accepting any category's links structure.
 */
export type DropdownMenuLinksMap = Record<string, DropdownMenuItemLink>;

/**
 * Properties for the {@link ServicesBlock} component.
 * Extends base primitive `div` props while omitting layout-breaking properties
 * in favor of targeted slot styling and a structured links dictionary map.
 */
export interface ServicesBlockProps
	extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children' | 'content' | 'className'> {
	/**
	 * Category header label for the services block section.
	 */
	label: string;

	/**
	 * Dictionary map of service link items to render within the section grid.
	 */
	links: DropdownMenuLinksMap;

	/**
	 * Custom class names for the block container, inner list, and section label slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer container `div` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner list `ul` slot.
		 */
		inner?: string;

		/**
		 * Override classes applied to the section header label `p` slot.
		 */
		label?: string;
	};
}

/**
 * Service category block component for rendering grouped megamenu links.
 * Maps dictionary entries against system route constants to render interactive {@link MenuItem} grid lists.
 *
 * @param props - Component configuration options defined by {@link ServicesBlockProps}.
 * @returns The rendered service category block layout element.
 */
export const ServicesBlock = (props: ServicesBlockProps): JSX.Element => {
	const { label, links, classNames, ...rest } = props;
	const { base, text, list } = styles();

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-menu='services-block-outer'
			className={base({ className: classNames?.outer })}
		>
			<Text as='p' data-menu='services-block-label' className={text({ className: classNames?.label })}>
				{label}
			</Text>

			<Box as='ul' data-menu='services-block-list' className={list({ className: classNames?.inner })}>
				{Object.entries(links).map(([key, value]) => {
					const href = SERVICES_APP_ROUTES[key];
					if (!href) return null;

					return <MenuItem key={key} href={href} title={value.title} description={value.description} />;
				})}
			</Box>
		</Box>
	);
};
