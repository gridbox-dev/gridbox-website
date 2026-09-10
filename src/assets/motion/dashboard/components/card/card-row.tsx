/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'flex items-stretch gap-20 h-fit w-full',
});

/**
 * Properties for the {@link CardRow} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type CardRowProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Horizontal row layout component for grouping dashboard card elements.
 * Provides a flexbox wrapper configured with stretch alignment and uniform gap spacing.
 *
 * @param props - The component props defined by {@link CardRowProps}.
 * @returns The rendered card row container element node.
 */
export const CardRow = (props: CardRowProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='card-row' className={styles({ className })}>
			{children}
		</Box>
	);
};
