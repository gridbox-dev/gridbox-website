/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'flex flex-col items-center justify-center h-fit w-full py-20 px-12',
		logo: 'size-24 bg-linear-to-tr from-utility-brand-50 to-utility-brand-300 rounded-4',
	},
});

/**
 * Properties for the {@link SidebarHeader} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type SidebarHeaderProps = Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children'>;

/**
 * Header section component for the dashboard navigation sidebar.
 * Displays the business logomark centered within a dedicated top container.
 *
 * @param props - The component props defined by {@link SidebarHeaderProps}.
 * @returns The rendered sidebar header element node.
 */
export const SidebarHeader = (props: SidebarHeaderProps): JSX.Element => {
	const { className, ...rest } = props;
	const { base, logo } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='sidebar-header' className={base({ className })}>
			<Box as='div' data-dashboard='business-logomark' className={logo()} />
		</Box>
	);
};
