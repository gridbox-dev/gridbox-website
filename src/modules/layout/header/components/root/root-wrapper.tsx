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
		base: 'sticky top-0 z-9999 w-full',
		inner: 'relative overflow-y-visible w-full',
	},
});

/**
 * Properties for the {@link RootWrapper} structural header component.
 * Extends base primitive `div` props while overriding `className` in favor of targeted slot classNames.
 */
export interface RootWrapperProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className'> {
	/**
	 * Custom class names for inner and outer structural slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer sticky container slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner animated content slot.
		 */
		inner?: string;
	};
}

/**
 * Structural container component for the website main navigation header and menu.
 * Separates sticky positioning contexts from animated inner layouts.
 *
 * @param props - Component configuration options defined by {@link RootWrapperProps}.
 * @returns The rendered double-wrapped header container node.
 */
export const RootWrapper = (props: RootWrapperProps): JSX.Element => {
	const { children, classNames, style, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Box as='div' data-header='root-wrapper-outer' className={base({ className: classNames?.outer })}>
			<Box
				{...(rest as BoxProps<'div'>)}
				as='div'
				data-header='root-wrapper-inner'
				style={{ ...style, height: HEADER_HEIGHT }}
				className={inner({ className: classNames?.inner })}
			>
				{children}
			</Box>
		</Box>
	);
};
