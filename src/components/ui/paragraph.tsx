/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Text, type TextElement, type TextProps } from '@/components/base/text';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	variants: {
		variant: {
			main: 'text-copy-18 text-pretty tablet:text-copy-20 laptop:text-balance',
			section: 'text-copy-16 text-pretty tablet:text-copy-18',
			feature: 'text-copy-14 text-pretty tablet:text-copy-16',
			text: 'text-copy-14 text-pretty tablet:text-copy-16',
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
		variant: 'text',
		color: 'tertiary',
		align: 'default',
	},
});

/**
 * Restricted HTML text element tags permitted for paragraph and body typography.
 */
export type ParagraphElement = Extract<TextElement, 'p' | 'span'>;

/**
 * Props for the high-level UI {@link Paragraph} component.
 * Extends {@link TextProps} generically while restricting the `as` polymorphic prop strictly
 * to paragraph or inline text elements (`p` or `span`) and providing predefined body copy
 * typography scaling variants, semantic color tokens, and alignment options.
 *
 * @typeParam E - The underlying paragraph HTML element tag to render. Defaults to `'p'`.
 */
export type ParagraphProps<E extends ParagraphElement = 'p'> = TextProps<E> & {
	/**
	 * Polymorphic HTML element tag for body text rendering.
	 * Restricted exclusively to `p` or `span`.
	 * @default 'p'
	 */
	as?: E;

	/**
	 * Visual hierarchy typography variant scale.
	 * @default 'text'
	 */
	variant?: 'main' | 'section' | 'feature' | 'text';

	/**
	 * Color hierarchy variant mapping to semantic color design tokens.
	 * @default 'tertiary'
	 */
	color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';

	/**
	 * Text alignment options.
	 * @default 'default'
	 */
	align?: 'default' | 'center';
};

/**
 * Semantic typography component for body text, narrative content, and inline captions.
 * Wraps low-level `Text` with responsive copy typography variants, semantic color tokens,
 * alignment options, and strict tag enforcement.
 *
 * @typeParam E - The underlying paragraph HTML element tag to render.
 * @param props - Component configuration properties conforming to {@link ParagraphProps}.
 * @returns The rendered semantic paragraph typography element.
 */
export const Paragraph = <E extends ParagraphElement = 'p'>(props: ParagraphProps<E>): JSX.Element => {
	const { variant, color, align, children, className, ...rest } = props;

	return (
		<Text {...(rest as TextProps<E>)} className={styles({ variant, color, align, className })}>
			{children}
		</Text>
	);
};
