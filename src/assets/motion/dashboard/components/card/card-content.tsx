/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'flex flex-col h-fit w-full p-16',

	variants: {
		withBorder: {
			true: 'border-b border-tertiary',
		},

		fullHeight: {
			true: 'h-full',
		},
	},
});

/**
 * Properties for the {@link CardContent} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export interface CardContentProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
	/**
	 * Whether should render a bottom border.
	 * @default false
	 */
	withBorder?: boolean;

	/**
	 * Whether should set height as full.
	 * @default false
	 */
	fullHeight?: boolean;
}

/**
 * Structural content wrapper for dashboard card sections.
 * Flexible column container that supports optional bottom border separation for card headers or inner blocks.
 *
 * @param props - The component props defined by {@link CardContentProps}.
 * @returns The rendered card content container element node.
 */
export const CardContent = (props: CardContentProps): JSX.Element => {
	const { withBorder, fullHeight, children, className, ...rest } = props;

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-dashboard='card-content'
			className={styles({ withBorder, fullHeight, className })}
		>
			{children}
		</Box>
	);
};
