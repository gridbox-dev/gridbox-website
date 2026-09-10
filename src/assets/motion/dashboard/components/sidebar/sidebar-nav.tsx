/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { SIDEBAR_ICONS_MAP } from '../../constants/sidebar-icons';
import { SidebarNavButton } from './sidebar-nav-button';

const styles = tv({
	base: 'flex flex-col items-center gap-2 h-fit w-full px-12',
});

/**
 * Properties for the {@link SidebarNav} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type SidebarNavProps = Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children'>;

/**
 * Navigation section component for the dashboard sidebar.
 * Maps and renders the list of navigation buttons based on predefined sidebar icons metadata.
 *
 * @param props - The component props defined by {@link SidebarNavProps}.
 * @returns The rendered sidebar navigation list node.
 */
export const SidebarNav = (props: SidebarNavProps): JSX.Element => {
	const { className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='sidebar-nav' className={styles({ className })}>
			{SIDEBAR_ICONS_MAP.map((item) => (
				<SidebarNavButton key={item.key} icon={item.icon} isActive={item.active || undefined} />
			))}
		</Box>
	);
};
