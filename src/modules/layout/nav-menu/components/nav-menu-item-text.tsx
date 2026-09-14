/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'text-copy-14 w-full',

	variants: {
		highlight: {
			true: 'font-medium text-primary',
			false: 'text-tertiary',
		},
	},
});

/**
 * Properties for the {@link NavMenuItemText} typographic element.
 * Extends base primitive `span` props while omitting polymorph controls.
 */
export interface NavMenuItemTextProps extends Omit<BoxProps<'span'>, 'as' | 'asChild'> {
	/**
	 * Toggles between primary emphasized text styling and secondary body text styling.
	 * @default false
	 */
	highlight?: boolean;
}

/**
 * Typographic component for rendering title and description text within navigation menu items.
 * Renders a `span` element with configurable emphasis hierarchy.
 *
 * @param props - Component configuration options defined by {@link NavMenuItemTextProps}.
 * @returns The rendered typographic text node.
 */
export const NavMenuItemText = (props: NavMenuItemTextProps): JSX.Element => {
	const { highlight, children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'span'>)} as='span' className={styles({ highlight, className })}>
			{children}
		</Box>
	);
};
