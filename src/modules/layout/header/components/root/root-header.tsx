/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { HEADER_HEIGHT } from '@/config/constants/header-height';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'relative z-50 overflow-hidden shrink-0 flex flex-col items-center justify-center w-full bg-primary border-b border-secondary',
		inner: 'flex items-center justify-between size-full max-w-container pl-16 pr-8 tablet:pl-32 tablet:pr-24',
	},
});

/**
 * Properties for the {@link RootHeader} semantic header bar component.
 * Extends base primitive `header` props while enforcing a mandatory `id` and replacing `className` with slot-targeted classes.
 */
export interface RootHeaderProps extends Omit<BoxProps<'header'>, 'as' | 'asChild' | 'id' | 'className'> {
	/**
	 * Unique DOM identifier required for accessibility, layout targeting, and animation orchestration.
	 */
	id: string;

	/**
	 * Custom class names for outer container and inner content constraint slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer semantic `header` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner layout container slot.
		 */
		inner?: string;
	};
}

/**
 * Primary semantic `header` element containing the main navigation bar.
 * Enforces standardized header height, background styling, and horizontal container alignment.
 *
 * @param props - Component configuration options defined by {@link RootHeaderProps}.
 * @returns The rendered semantic header element containing wrapped navigation controls.
 */
export const RootHeader = (props: RootHeaderProps): JSX.Element => {
	const { children, classNames, style, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Box
			{...(rest as BoxProps<'header'>)}
			as='header'
			data-header='root-container-outer'
			style={{ ...style, height: HEADER_HEIGHT }}
			className={base({ className: classNames?.outer })}
		>
			<Box as='div' data-header='root-container-inner' className={inner({ className: classNames?.inner })}>
				{children}
			</Box>
		</Box>
	);
};
