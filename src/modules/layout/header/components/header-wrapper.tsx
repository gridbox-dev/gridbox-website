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
	base: 'relative z-9999 overflow-y-visible w-full',
});

/**
 * Properties for the {@link HeaderWrapper} structural component.
 * Extends base primitive `header` element props while omitting polymorph controls.
 */
export interface HeaderWrapperProps extends Omit<BoxProps<'header'>, 'as' | 'asChild' | 'id'> {
	/**
	 * Mandatory unique DOM identifier required for anchor navigation and accessibility mapping.
	 */
	id: string;
}

/**
 * Structural header layout wrapper component.
 * Positions top-level page navigation elements within a high z-index stacking context.
 *
 * @param props - Component options defined by {@link HeaderWrapperProps}.
 * @returns The rendered header wrapper node.
 */
export const HeaderWrapper = (props: HeaderWrapperProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box
			{...(rest as BoxProps<'header'>)}
			as='header'
			data-header='wrapper'
			style={{ height: HEADER_HEIGHT }}
			className={styles({ className })}
		>
			{children}
		</Box>
	);
};
