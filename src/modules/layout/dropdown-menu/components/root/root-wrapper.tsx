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
		base: 'absolute inset-0 z-0 flex flex-col items-center h-fit w-full bg-primary shadow-lg',
		inner: 'flex flex-col h-fit w-full max-w-container p-32',
	},
});

/**
 * Properties for the {@link RootWrapper} megamenu overlay container component.
 * Extends base primitive `div` props while omitting polymorphic properties and top-level `className`
 * in favor of targeted slot styling and custom style overrides.
 */
export interface RootWrapperProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className'> {
	/**
	 * Custom class names for the outer absolute container and inner layout wrapper slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer absolute position `div` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner container `div` slot.
		 */
		inner?: string;
	};
}

/**
 * Root container layout component for header megamenu overlays.
 * Positions absolute content below the fixed header height while wrapping inner panel nodes within layout boundaries.
 *
 * @param props - Component configuration options defined by {@link RootWrapperProps}.
 * @returns The rendered megamenu root overlay container element.
 */
export const RootWrapper = (props: RootWrapperProps): JSX.Element => {
	const { children, classNames, style, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-menu='root-container-outer'
			style={{ ...style, paddingTop: HEADER_HEIGHT }}
			className={base({ className: classNames?.outer })}
		>
			<Box as='div' data-menu='root-container-inner' className={inner({ className: classNames?.inner })}>
				{children}
			</Box>
		</Box>
	);
};
