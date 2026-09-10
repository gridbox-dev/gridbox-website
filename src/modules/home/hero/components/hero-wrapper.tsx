/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: [
		'relative overflow-hidden flex flex-col items-center gap-48 h-fit w-full pt-48',
		'bg-primary text-primary',
		'tablet:gap-64 tablet:pt-64 laptop:pt-80',
	].join(' '),
});

/**
 * Props for the layout {@link HeroWrapper} component.
 * Extends base section properties while requiring a unique `id` for anchor navigation
 * and restricting polymorphism to guarantee semantic `<section>` rendering.
 */
export interface HeroWrapperProps extends Omit<BoxProps<'section'>, 'id' | 'asChild' | 'as'> {
	/**
	 * Mandatory unique DOM identifier required for anchor navigation and analytics tracking.
	 */
	id: string;
}

/**
 * High-level layout container for landing page hero sections.
 * Enforces a semantic `<section>` element wrapper with DOM identification.
 *
 * @param props - Component configuration properties conforming to {@link HeroWrapperProps}.
 * @returns The rendered hero section wrapper element.
 */
export const HeroWrapper = (props: HeroWrapperProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'section'>)} as='section' data-hero='wrapper' className={styles({ className })}>
			{children}
		</Box>
	);
};
