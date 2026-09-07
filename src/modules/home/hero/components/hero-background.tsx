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
		base: [
			'absolute overflow-hidden pointer-events-none select-none left-0 z-0',
			'flex flex-col items-center h-full w-full pt-48',
			'tablet:pt-64 laptop:pt-96',
		].join(' '),
		surface: 'relative size-full bg-linear-to-b from-20% from-bg-secondary to-40% to-bg-primary',
		pattern: [
			'absolute inset-0 z-10 size-full pointer-events-none',
			'bg-[radial-gradient(color-mix(in_srgb,var(--color-alpha-black)_5%,transparent)_1px,transparent_1px)]',
			'bg-size-[4px_4px] tablet:bg-size-[6px_6px]',
			'mask-radial-gradient',
		].join(' '),
	},
});

/**
 * Props for the {@link HeroBackground} layout component.
 * Extends base `HTMLDivElement` attributes while restricting polymorphism (`as` / `asChild`),
 * omitting children and aria attributes to guarantee a purely decorative background surface.
 */
export interface HeroBackgroundProps
	extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children' | 'aria-hidden' | 'className'> {
	/**
	 * Optional slot-specific CSS class overrides for internal background elements.
	 */
	classNames?: {
		/**
		 * Custom CSS class overrides applied to the outer background container element.
		 */
		container?: string;

		/**
		 * Custom CSS class overrides applied to the linear gradient surface element.
		 */
		surface?: string;

		/**
		 * Custom CSS class overrides applied to the radial dot overlay pattern element.
		 */
		pattern?: string;
	};
}

/**
 * Decorative background component for landing page hero sections.
 * Combines a vertical color gradient with a subtle radial dot pattern overlay.
 * Enforces `aria-hidden="true"` and `pointer-events-none` for screen reader and interaction safety.
 *
 * @param props - Configuration properties conforming to {@link HeroBackgroundProps}.
 * @returns The rendered background decorative surface node.
 */
export const HeroBackground = (props: HeroBackgroundProps): JSX.Element => {
	const { classNames, ...rest } = props;
	const { base, surface, pattern } = styles();

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			aria-hidden='true'
			data-hero='background'
			className={base({ className: classNames?.container })}
		>
			<Box as='div' data-hero='background-surface' className={surface({ className: classNames?.surface })}>
				<Box as='div' data-hero='background-pattern' className={pattern({ className: classNames?.pattern })} />
			</Box>
		</Box>
	);
};
