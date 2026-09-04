/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { ElementType, JSX } from 'react';
import { Separator, type SeparatorProps } from '@/components/base/separator';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'shrink-0 border-0 transition-colors duration-150',

	variants: {
		orientation: {
			horizontal: 'h-px w-full',
			vertical: 'min-h-full w-px self-stretch',
		},

		color: {
			primary: 'bg-border-primary',
			secondary: 'bg-border-secondary',
			tertiary: 'bg-border-tertiary',
		},

		variant: {
			solid: undefined,
			dashed: [
				'bg-transparent',
				'data-[orientation=horizontal]:border-b data-[orientation=horizontal]:border-dashed data-[orientation=horizontal]:h-0',
				'data-[orientation=vertical]:border-r data-[orientation=vertical]:border-dashed data-[orientation=vertical]:w-0',
			].join(' '),
		},
	},

	compoundVariants: [
		{
			variant: 'dashed',
			color: 'primary',
			class: 'border-border-primary',
		},
		{
			variant: 'dashed',
			color: 'secondary',
			class: 'border-border-secondary',
		},
		{
			variant: 'dashed',
			color: 'tertiary',
			class: 'border-border-tertiary',
		},
	],

	defaultVariants: {
		orientation: 'horizontal',
		color: 'secondary',
		variant: 'solid',
	},
});

/**
 * Props for the high-level UI {@link Divider} component.
 * Extends {@link SeparatorProps} generically to preserve polymorphism (`as` / `asChild`),
 * React Aria accessibility features, and DOM orientation states while adding design system
 * variant styling options.
 *
 * @typeParam E - The underlying HTML element or React component type to render. Defaults to `'hr'`.
 */
export type DividerProps<E extends ElementType = 'hr'> = SeparatorProps<E> & {
	/**
	 * Visual hierarchy color variant mapping to border design tokens.
	 * @default 'secondary'
	 */
	color?: 'primary' | 'secondary' | 'tertiary';

	/**
	 * Line stroke style variant.
	 * @default 'solid'
	 */
	variant?: 'solid' | 'dashed';
};

/**
 * High-level accessible divider component.
 * Wraps low-level `Separator` with predefined responsive styling variants, semantic border color
 * tokens, line patterns, and orientation layout adjustments.
 *
 * @typeParam E - The underlying HTML element or React component type to render.
 * @param props - Component configuration properties conforming to {@link SeparatorProps}.
 * @returns The rendered styled divider element.
 */
export const Divider = <E extends ElementType = 'hr'>(props: DividerProps<E>): JSX.Element => {
	const { color, variant, orientation = 'horizontal', className, ...rest } = props;

	return (
		<Separator
			{...(rest as SeparatorProps<E>)}
			orientation={orientation}
			className={styles({ orientation, color, variant, className })}
		/>
	);
};
