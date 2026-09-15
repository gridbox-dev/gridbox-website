/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { Text } from '@/components/base/text';
import type { InferDictionary } from '@/config/i18n';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'flex flex-col gap-12 h-fit w-full',
		text: 'text-copy-14 font-medium text-quaternary',
		list: 'grid grid-cols-3 gap-y-8 gap-x-24 h-fit w-full',
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

export interface ServicesBlockProps
	extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children' | 'content' | 'className'> {
	label: string;

	links: DropdownMenuLinksMap;

	classNames?: {
		outer?: string;
		inner?: string;
		label?: string;
	};
}

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
				Services block
			</Box>
		</Box>
	);
};
