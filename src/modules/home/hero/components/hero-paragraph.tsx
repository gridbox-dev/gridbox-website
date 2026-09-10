/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Paragraph, type ParagraphProps } from '@/components/ui/paragraph';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'max-w-560 laptop:max-w-768',
});

/**
 * Props for the specialized {@link HeroParagraph} component.
 * Extends base paragraph properties while restricting polymorphism (`as` / `asChild`) and forcing
 * preset typography variant, color hierarchy, and alignment tokens for hero copy consistency.
 */
export type HeroParagraphProps = Omit<ParagraphProps<'p'>, 'as' | 'asChild' | 'variant' | 'color' | 'align'>;

/**
 * Specialized paragraph component for landing page hero sections.
 * Enforces a centered, high-contrast descriptive text block with max-width constraints.
 *
 * @param props - Configuration properties conforming to {@link HeroParagraphProps}.
 * @returns The rendered hero paragraph element node.
 */
export const HeroParagraph = (props: HeroParagraphProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Paragraph
			{...(rest as ParagraphProps<'p'>)}
			as='p'
			data-hero='paragraph'
			variant='main'
			color='tertiary'
			align='center'
			className={styles({ className })}
		>
			{children}
		</Paragraph>
	);
};
