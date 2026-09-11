/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { LogoLink } from '@/components/ui/logo-link';
import { tv } from '@/config/ui/tw-variants';
import { HeaderNavItem } from './header-nav-item';

const styles = tv({
	slots: {
		base: 'flex items-center gap-24 h-fit w-full',
		inner: 'hidden laptop:flex laptop:items-center laptop:gap-2 laptop:w-full',
	},
});

/**
 * Properties for the {@link HeaderNav} layout component.
 * Extends primitive `div` element props while omitting polymorph controls.
 */
export type HeaderNavProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Main site header navigation container component.
 * Embeds the primary {@link LogoLink} branding component alongside a responsive `nav` element
 * that encapsulates desktop navigation links.
 *
 * @param props - Component options conforming to {@link HeaderNavProps}.
 * @returns The rendered header navigation container node.
 */
const HeaderNavBase = (props: HeaderNavProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-header='navigation-outer' className={base({ className })}>
			<LogoLink />

			<Box as='nav' data-header='navigation-inner' className={inner()}>
				{children}
			</Box>
		</Box>
	);
};

export const HeaderNav = Object.assign(HeaderNavBase, {
	Item: HeaderNavItem,
});
