/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'relative flex flex-col items-center gap-32 w-full',
		content: 'flex flex-col gap-32 w-full',
	},

	variants: {
		layout: {
			contained: {
				base: 'h-fit max-w-container px-16 tablet:px-32',
				content: 'items-center h-fit laptop:gap-48',
			},

			full: {
				base: 'overflow-hidden h-360 tablet:h-480 laptop:h-640',
				content: 'h-full pl-16 tablet:pl-32 laptop:items-center laptop:px-32 laptop:max-w-container',
			},
		},
	},

	defaultVariants: {
		layout: 'contained',
	},
});

/**
 * Props for the layout {@link HeroContainer} component.
 * Extends base `HTMLDivElement` attributes while restricting polymorphism (`as` / `asChild`)
 * and replacing standard `className` with a multi-slot `classNames` object.
 */
export interface HeroContainerProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className'> {
	/**
	 * Specifies the structural layout variant for the hero container.
	 * @default 'contained'
	 */
	layout?: 'contained' | 'full';

	/**
	 * Allows custom CSS class overrides targeting specific internal component slots.
	 */
	classNames?: {
		/**
		 * Custom classes applied to the outer wrapper slot.
		 */
		container?: string;

		/**
		 * Custom classes applied to the inner slot.
		 */
		content?: string;
	};
}

/**
 * High-level structural hero container component.
 * Organizes inner hero media and copy elements into `contained` or `full` viewport layouts.
 *
 * @param props - Configuration properties conforming to {@link HeroContainerProps}.
 * @returns The rendered hero layout container node.
 */
export const HeroContainer = (props: HeroContainerProps): JSX.Element => {
	const { layout, children, classNames, ...rest } = props;
	const { base, content } = styles({ layout });

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-hero='container'
			data-layout={layout || undefined}
			className={base({ className: classNames?.container })}
		>
			<Box as='div' data-hero='content' className={content({ className: classNames?.content })}>
				{children}
			</Box>
		</Box>
	);
};
