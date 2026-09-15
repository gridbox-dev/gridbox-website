/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { LogoLink } from '@/components/ui/logo-link';
import type { InferDictionary } from '@/config/i18n';
import { tv } from '@/config/ui/tw-variants';
import { NavbarLink } from '@/modules/layout/header/components/navigation/navbar-link';
import { NavbarTrigger } from '@/modules/layout/header/components/navigation/navbar-trigger';

const styles = tv({
	slots: {
		base: 'block w-full',
		inner: 'flex items-center gap-24 h-fit w-full',
		list: 'hidden laptop:flex laptop:items-center laptop:gap-2 laptop:w-full',
	},
});

/**
 * Properties for the {@link Navbar} navigation bar layout component.
 * Extends base primitive `div` props while overriding `className`, `children`, and `content`
 * in favor of targeted slot classNames and i18n content bindings.
 */
export interface NavbarProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className' | 'children' | 'content'> {
	/**
	 * Navigation dictionary subsection inferred from i18n content.
	 */
	content: InferDictionary<'header'>['navbar'];

	/**
	 * Custom class names for outer wrapper, inner semantic `nav`, and interactive trigger list slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer wrapper `div` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner semantic `nav` slot.
		 */
		inner?: string;

		/**
		 * Override classes applied to the interactive trigger list `ul` slot.
		 */
		list?: string;
	};
}

/**
 * Main navigation bar component rendering the brand logo link and iterating over primary category triggers and direct links.
 *
 * @param props - Component configuration options defined by {@link NavbarProps}.
 * @returns The rendered navigation bar element.
 */
export const Navbar = (props: NavbarProps): JSX.Element => {
	const { content, classNames, ...rest } = props;
	const { base, inner, list } = styles();

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-header='navbar-container'
			className={base({ className: classNames?.outer })}
		>
			<Box as='nav' data-header='navbar' className={inner({ className: classNames?.inner })}>
				<LogoLink aria-label={content.logoLink.ariaLabel} />

				<Box as='ul' data-header='navbar-list' className={list({ className: classNames?.list })}>
					{content.triggers.map((item) =>
						item.href ? (
							<NavbarLink key={item.value} href={item.href} aria-label={item.ariaLabel}>
								{item.label}
							</NavbarLink>
						) : (
							<NavbarTrigger key={item.value} value={item.value} aria-label={item.ariaLabel}>
								{item.label}
							</NavbarTrigger>
						),
					)}
				</Box>
			</Box>
		</Box>
	);
};
