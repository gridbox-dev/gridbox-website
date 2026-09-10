/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { SidebarHeader } from './sidebar-header';
import { SidebarNav } from './sidebar-nav';

const styles = tv({
	slots: {
		base: 'flex flex-col items-center h-full w-56 shrink-0 bg-primary border-r border-tertiary',
		inner: 'flex flex-col items-center h-fit w-full',
	},
});

/**
 * Properties for the {@link Sidebar} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type SidebarProps = Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children'>;

/**
 * Main sidebar container component for the interactive dashboard widget.
 * Encapsulates the sidebar header logomark and navigation items within a fixed-width vertical column.
 *
 * @param props - The component props defined by {@link SidebarProps}.
 * @returns The rendered sidebar element node.
 */
export const Sidebar = (props: SidebarProps): JSX.Element => {
	const { className, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='sidebar' className={base({ className })}>
			<Box as='div' data-dashboard='sidebar-inner' className={inner()}>
				<SidebarHeader />
				<SidebarNav />
			</Box>
		</Box>
	);
};
