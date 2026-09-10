/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'relative flex size-full bg-primary',
});

/**
 * Properties for the {@link DashboardWrapper} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type DashboardWrapperProps = Omit<BoxProps<'div'>, 'asChild' | 'as' | 'aria-hidden'>;

/**
 * Root container layout component for the interactive dashboard widget.
 * Provides the base positioning context, background styling, and standard bounding dimensions.
 *
 * @param props - The component props defined by {@link DashboardWrapperProps}.
 * @returns The rendered dashboard wrapper element node.
 */
export const DashboardWrapper = (props: DashboardWrapperProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			aria-hidden='true'
			data-dashboard='wrapper'
			className={styles({ className })}
		>
			{children}
		</Box>
	);
};
