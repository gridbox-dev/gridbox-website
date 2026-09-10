/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Children, type JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'flex flex-col gap-20 h-fit w-full p-20 pt-16 bg-primary',
		section: 'flex flex-col h-fit w-full',
		inner: 'flex items-stretch gap-20 h-fit w-full',
	},
});

/**
 * Properties for the {@link DashboardContent} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type DashboardContentProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Main content layout wrapper for the dashboard interface.
 * Safely iterates over top-level child elements using `Children.map` and wraps each section
 * within structured semantic wrappers.
 *
 * @param props - The component props defined by {@link DashboardContentProps}.
 * @returns The rendered main content layout node.
 */
export const DashboardContent = (props: DashboardContentProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base, section, inner } = styles();

	const formattedChildren = Children.map(children, (child) => (
		<Box as='div' data-dashboard='section' className={section()}>
			<Box as='div' data-dashboard='section-inner' className={inner()}>
				{child}
			</Box>
		</Box>
	));

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='main' className={base({ className })}>
			{formattedChildren}
		</Box>
	);
};
