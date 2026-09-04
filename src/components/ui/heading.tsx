/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Text, type TextElement, type TextProps } from '@/components/base/text';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'font-medium',

	variants: {
		variant: {
			main: 'text-heading-36 text-balance tablet:text-heading-48 laptop:text-heading-60',
			section: 'text-heading-30 text-pretty tablet:text-heading-36',
			feature: 'text-copy-18 text-pretty tablet:text-copy-20',
		},

		color: {
			primary: 'text-primary',
			secondary: 'text-secondary',
			tertiary: 'text-tertiary',
			quaternary: 'text-quaternary',
		},

		align: {
			default: 'text-left',
			center: 'text-center',
		},
	},

	defaultVariants: {
		variant: 'section',
		color: 'primary',
		align: 'default',
	},
});

/**
 * Restricted HTML text element tags permitted for heading typography.
 */
export type HeadingElement = Extract<TextElement, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

/**
 * Props for the high-level UI {@link Heading} component.
 * Extends {@link BaseTextProps} while restricting the `as` polymorphic prop strictly to heading elements
 * and providing predefined typography scaling variants, color tokens, and alignment options.
 *
 * @typeParam E - The underlying heading HTML element tag to render. Defaults to `'h2'`.
 */
export type HeadingProps<E extends HeadingElement = 'h2'> = TextProps<E> & {
	/**
	 * Polymorphic HTML heading element tag.
	 * Restricted to `h1`, `h2`, `h3`, `h4`, `h5`, and `h6`.
	 * @default 'h2'
	 */
	as?: E;

	/**
	 * Visual hierarchy typography variant scale.
	 * @default 'section'
	 */
	variant?: 'main' | 'section' | 'feature';

	/**
	 * Color hierarchy variant mapping to semantic color design tokens.
	 * @default 'primary'
	 */
	color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';

	/**
	 * Text alignment options.
	 * @default 'default'
	 */
	align?: 'default' | 'center';
};

/**
 * Semantic typography component for section headings and titles.
 * Wraps low-level `BaseText` with predefined responsive typography variants, semantic color tokens,
 * alignment options, and strict heading element enforcement.
 *
 * @typeParam E - The underlying heading HTML element tag to render.
 * @param props - Component configuration properties conforming to {@link HeadingProps}.
 * @returns The rendered semantic heading typography element.
 */
export const Heading = <E extends HeadingElement = 'h2'>(props: HeadingProps<E>): JSX.Element => {
	const { variant, color, align, children, className, ...rest } = props;

	return (
		<Text {...(rest as TextProps<E>)} className={styles({ variant, color, align, className })}>
			{children}
		</Text>
	);
};
