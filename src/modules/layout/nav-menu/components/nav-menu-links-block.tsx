/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Children, type JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { Text } from '@/components/base/text';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'flex flex-col gap-12 h-fit w-full',
		label: 'text-copy-14 font-medium text-quaternary',
		list: 'grid grid-cols-3 gap-8 h-fit w-full',
		item: 'block h-fit w-fit',
	},
});

/**
 * Properties for the {@link NavMenuLinksBlock} component.
 * Extends base primitive `div` element props while omitting polymorph controls.
 */
export interface NavMenuLinksBlockProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
    /**
	 * Category or section label text displayed above the link list.
	 */
	label: string;
}

/**
 * Categorized grid layout block for grouping navigation links within dropdown menus.
 * Renders a section label above an unordered grid list, wrapping each child link inside a list item node.
 *
 * @param props - Component configuration options defined by {@link NavMenuLinksBlockProps}.
 * @returns The rendered navigation links block node structure.
 */
const NavMenuLinksBlockBase = (props: NavMenuLinksBlockProps): JSX.Element => {
	const { label: text, children, className, ...rest } = props;
	const { base, label, list, item } = styles();

	const formattedChildren = Children.map(children, (child) => (
		<Box as='li' data-menu='links-block-list-item' className={item()}>
			{child}
		</Box>
	));

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-menu='links-block' className={base({ className })}>
			<Text as='p' data-menu='links-block-label' className={label()}>
				{text}
			</Text>

			<Box as='ul' data-menu='links-block-list' className={list()}>
				{formattedChildren}
			</Box>
		</Box>
	);
};

export const NavMenuLinksBlock = Object.assign(NavMenuLinksBlockBase, {});
