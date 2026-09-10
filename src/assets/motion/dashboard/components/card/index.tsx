/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { CardContent } from './card-content';
import { CardText } from './card-text';

const styles = tv({
	base: 'flex flex-col w-full bg-primary rounded-12 border border-tertiary',

	variants: {
		stretch: {
			true: 'w-100',
		},
	},
});

/**
 * Properties for the {@link Card} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export interface CardProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
	stretch?: boolean;
}

/**
 * Base card container for dashboard widget items.
 * Provides a bordered, rounded column surface with background styling.
 *
 * @param props - The component props defined by {@link CardProps}.
 * @returns The rendered card base element node.
 */
const CardBase = (props: CardProps): JSX.Element => {
	const { stretch, children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='card' className={styles({ stretch, className })}>
			{children}
		</Box>
	);
};

export const Card = Object.assign(CardBase, {
	ContentBlock: CardContent,
	Text: CardText,
});
