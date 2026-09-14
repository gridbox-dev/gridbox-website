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
		base: 'hidden absolute z-0 inset-0 h-svh w-full bg-overlay/30 backdrop-blur-sm laptop:block',
		container: 'flex flex-col items-center h-fit w-full min-h-95 bg-primary shadow-3xl',
		inner: 'flex flex-col h-fit w-full max-w-container px-32',
		content: 'flex flex-col gap-20 h-fit w-full pt-32 pb-40',
	},
});

/**
 * Properties for the {@link NavMenuWrapper} structural layout component.
 * Extends base primitive `div` element props while omitting polymorph controls and identifier attributes.
 */
export interface NavMenuWrapperProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'id'> {}

/**
 * Full-screen backdrop and container wrapper for desktop navigation dropdown menus.
 * Renders an absolute overlay positioned below the header boundary with structured content containers.
 *
 * @param props - Component configuration options defined by {@link NavMenuWrapperProps}.
 * @returns The rendered navigation menu wrapper node structure.
 */
export const NavMenuWrapper = (props: NavMenuWrapperProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base, container, inner, content } = styles();

	return (
		<Box as='div' data-menu='wrapper' style={{ paddingTop: HEADER_HEIGHT }} className={base()}>
			<Box {...(rest as BoxProps<'div'>)} as='div' data-menu='container' className={container({ className })}>
				<Box as='div' data-menu='inner' className={inner()}>
					<Box as='div' data-menu='content' className={content()}>
						{children}
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
