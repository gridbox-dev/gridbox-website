/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'w-full',

	variants: {
		highlight: {
			true: 'text-copy-16 font-medium text-primary',
			false: 'text-copy-14 text-tertiary',
		},
	},
});

/**
 * Properties for the {@link CardText} component.
 * Extends base `span` element props while omitting unused primitive props.
 */
export interface CardTextProps extends Omit<BoxProps<'span'>, 'as' | 'asChild'> {
	/**
	 * Toggles between primary emphasized text styling and secondary body text styling.
	 * @default false
	 */
	highlight?: boolean;
}

/**
 * Text node component for rendering titles and descriptions within dashboard cards.
 * Applies conditional typography based on the `highlight` variant state.
 *
 * @param props - The component props defined by {@link CardTextProps}.
 * @returns The rendered card text element node.
 */
export const CardText = (props: CardTextProps): JSX.Element => {
	const { highlight, children, className, ...rest } = props;

	return (
		<Box
			{...(rest as BoxProps<'span'>)}
			as='span'
			data-dashboard='card-text'
			className={styles({ highlight, className })}
		>
			{children}
		</Box>
	);
};
