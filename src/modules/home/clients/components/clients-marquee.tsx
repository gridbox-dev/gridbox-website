/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Children, type JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { ClientsMarqueeItem } from './clients-marquee-item';

const styles = tv({
	slots: {
		base: ['grid grid-cols-2 gap-px h-fit w-full bg-border-tertiary', 'tablet:grid-cols-3 laptop:grid-cols-6'].join(
			' ',
		),
		item: 'flex items-center justify-center h-96 w-full px-24 bg-primary pointer-events-none select-none',
	},
});

/**
 * Properties for the {@link ClientsMarquee} compound component.
 * Extends primitive `ul` element props while omitting polymorph controls.
 */
export type ClientsMarqueeProps = Omit<BoxProps<'ul'>, 'as' | 'asChild'>;

/**
 * Base grid container component for displaying client and partner logos.
 * Utilizes a 1px gap over a border-colored background to render non-overlapping divider lines.
 *
 * @param props - Component options defined by {@link ClientsMarqueeProps}.
 * @returns The rendered list container node.
 */
export const ClientsMarqueeBase = (props: ClientsMarqueeProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base, item } = styles();

	const formattedChildren = Children.map(children, (child) => (
		<Box as='li' data-clients='marquee-item' className={item()}>
			{child}
		</Box>
	));

	return (
		<Box {...(rest as BoxProps<'ul'>)} as='ul' data-clients='marquee' className={base({ className })}>
			{formattedChildren}
		</Box>
	);
};

export const ClientsMarquee = Object.assign(ClientsMarqueeBase, {
	Item: ClientsMarqueeItem,
});
