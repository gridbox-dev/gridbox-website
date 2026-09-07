/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Heading, type HeadingProps } from '@/components/ui/heading';

/**
 * Props for the specialized {@link HeroHeading} component.
 * Extends base heading properties while restricting polymorphism (`as` / `asChild`) to guarantee
 * a single semantic `<h1>` tag per hero section, enforcing preset variant, color, and alignment tokens.
 */
export type HeroHeadingProps = Omit<HeadingProps<'h1'>, 'as' | 'asChild' | 'variant' | 'color' | 'align'>;

/**
 * Specialized title component for landing page hero sections.
 * Enforces a centered primary `<h1>` heading element with data identification
 * for optimal SEO structure and accessibility.
 *
 * @param props - Configuration properties conforming to {@link HeroHeadingProps}.
 * @returns The rendered hero title heading element node.
 */
export const HeroHeading = (props: HeroHeadingProps): JSX.Element => {
	const { children, ...rest } = props;

	return (
		<Heading
			{...(rest as HeadingProps<'h1'>)}
			as='h1'
			data-hero='heading'
			variant='main'
			color='primary'
			align='center'
		>
			{children}
		</Heading>
	);
};
