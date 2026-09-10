/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { HeroHeading } from './hero-heading';
import { HeroParagraph } from './hero-paragraph';

const styles = tv({
	base: 'flex flex-col items-center gap-16 w-full max-w-1024 tablet:gap-20 laptop:gap-24',
});

/**
 * Props for the {@link HeroHeader} compound container component.
 * Extends base `HTMLDivElement` attributes while restricting polymorphism (`as` / `asChild`)
 * to guarantee a structural block wrapper for hero titles and copy.
 */
export type HeroHeaderProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Base layout element for grouping hero headings and copy text.
 * Enforces a centered flex column with responsive gap scaling.
 *
 * @param props - Configuration properties conforming to {@link HeroHeaderProps}.
 * @returns The rendered hero header wrapper node.
 */
const HeroHeaderBase = (props: HeroHeaderProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-hero='header' className={styles({ className })}>
			{children}
		</Box>
	);
};

/**
 * Compound component for hero section headers.
 * Provides namespaced subcomponents for expressive assembly.
 */
export const HeroHeader = Object.assign(HeroHeaderBase, {
	Heading: HeroHeading,
	Paragraph: HeroParagraph,
});
