/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Children, isValidElement, type JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { LogoLink } from '@/components/ui/logo-link';
import { tv } from '@/config/ui/tw-variants';
import { HeaderNavItem, type HeaderNavItemProps } from './header-nav-item';

const styles = tv({
	slots: {
		base: 'flex items-center gap-24 h-fit w-full',
		inner: 'hidden laptop:block laptop:w-full',
		list: 'flex items-center gap-2 w-full',
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
	const { base, inner, list } = styles();

	const formattedChildren = Children.map(children, (child) => {
		if (!isValidElement(child)) return child;

		if (child.type === HeaderNavItem) {
			const childProps = child.props as HeaderNavItemProps;

			const id = `${childProps.id}-container`;

			return (
				<Box as='li' id={childProps.as === 'button' ? id : undefined} data-header='navigation-item-container'>
					{child}
				</Box>
			);
		}
	});

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-header='navigation-outer' className={base({ className })}>
			<LogoLink />

			<Box as='nav' data-header='navigation-inner' className={inner()}>
				<Box as='ul' data-header='navigation-list' className={list()}>
					{formattedChildren}
				</Box>
			</Box>
		</Box>
	);
};

export const HeaderNav = Object.assign(HeaderNavBase, {
	Item: HeaderNavItem,
});
