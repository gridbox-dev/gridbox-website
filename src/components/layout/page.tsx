/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'min-h-svh w-screen',

	variants: {
		background: {
			primary: 'bg-primary',
			secondary: 'bg-secondary',
			tertiary: 'bg-tertiary',
		},
	},

	defaultVariants: {
		background: 'primary',
	},
});

/**
 * Props for the {@link Page} layout component.
 * Extends {@link BoxProps} for a `div` element, excluding 'as', 'asChild', and 'id'
 * to enforce structured page identifiers and background variant tokens.
 */
export interface PageProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'id'> {
	/**
	 * Unique HTML element identifier for the page wrapper.
	 * Must follow the structured suffix format (e.g., 'home-page', 'about-page').
	 */
	id: `${string}-page`;

	/**
	 * Background color variant token mapped from the UI configuration.
	 * @default 'primary'
	 */
	background?: 'primary' | 'secondary' | 'tertiary';
}

/**
 * Higher-level layout container component designed to encapsulate top-level page views within the Shell.
 * Provides consistent full-viewport dimensions and structured background theme tokens.
 *
 * @param props - Component options conforming to {@link PageProps}.
 * @returns The rendered page container node.
 * @throws {Error} If `id` is not provided or is an empty string.
 */
export const Page = (props: PageProps): JSX.Element => {
	const { id, background, children, className, ...rest } = props;

	if (!id) {
		throw new Error('Page component must have a unique identifier.');
	}

	return (
		<Box {...rest} as='div' id={id} data-layout='page' className={styles({ background, className })}>
			{children}
		</Box>
	);
};
