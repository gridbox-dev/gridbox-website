/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box } from '@/components/base/box';
import { Link, type LinkProps } from '@/components/base/link';
import { Button } from '@/components/ui/button';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'p-6',
});

/**
 * Properties for the {@link NavbarLink} direct navigation link component.
 * Extends base {@link LinkProps} while omitting polymorphism props and replacing `className` with slot-targeted classNames.
 */
export interface NavbarLinkProps extends Omit<LinkProps<'a'>, 'as' | 'asChild' | 'className'> {
	/**
	 * Custom class names for the outer list item container and inner interactive link button slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer wrapper `li` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner interactive `a` link button slot.
		 */
		link?: string;
	};
}

/**
 * Direct navigation link item rendered within the main header navbar list.
 * Wraps a primitive anchor tag inside a styled button container using Radix `asChild` composition.
 *
 * @param props - Component configuration options defined by {@link NavbarLinkProps}.
 * @returns The rendered list item wrapper containing the interactive navigation link.
 */
export const NavbarLink = (props: NavbarLinkProps): JSX.Element => {
	const { children, classNames, ...rest } = props;

	return (
		<Box as='li' data-header='navbar-link-wrapper' className={classNames?.outer}>
			<Button
				asChild
				data-header='navbar-link'
				size='xs'
				variant='ghost'
				className={styles({ className: classNames?.link })}
			>
				<Link {...(rest as LinkProps<'a'>)}>{children}</Link>
			</Button>
		</Box>
	);
};
