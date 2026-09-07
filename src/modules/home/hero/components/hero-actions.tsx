/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { CTA, type CTAProps } from '@/components/ui/cta';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: ['flex flex-col-reverse items-center gap-12 w-full', 'tablet:flex-row tablet:w-fit'].join(' '),
		cta: 'mobile:max-tablet:w-full',
	},
});

/**
 * Props for the {@link HeroActions} compound container component.
 * Extends base `HTMLDivElement` attributes while restricting polymorphism (`as` / `asChild`)
 * to guarantee a structural container for hero call-to-action buttons.
 */
export type HeroActionsProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Props for the specialized {@link HeroCTA} subcomponent.
 * Extends {@link CTAProps} while omitting `size` to enforce preset `xl` hero sizing design tokens.
 */
export type HeroCTAProps = Omit<CTAProps, 'size'>;

/**
 * Specialized call-to-action subcomponent for hero sections.
 * Enforces `xl` sizing and responsive full-width layout on mobile viewports (`mobile:max-tablet:w-full`)
 * while applying namespaced attributes for testing and styling assertions.
 *
 * @param props - Configuration properties conforming to {@link HeroCTAProps}.
 * @returns The rendered hero call-to-action button node.
 */
const HeroCTA = (props: HeroCTAProps): JSX.Element => {
	const { children, className, hierarchy, ...rest } = props;
	const { cta } = styles();

	return (
		<CTA {...rest} hierarchy={hierarchy} size='xl' data-hero={`${hierarchy}-cta`} className={cta({ className })}>
			{children}
		</CTA>
	);
};

/**
 * Structural container for call-to-action buttons within hero sections.
 * Enforces a mobile-first stacked column layout with reversed DOM order that transitions into a
 * horizontal row on tablet viewports and above.
 *
 * @param props - Configuration properties conforming to {@link HeroActionsProps}.
 * @returns The rendered hero actions container node.
 */
const HeroActionsBase = (props: HeroActionsProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-hero='actions' className={base({ className })}>
			{children}
		</Box>
	);
};

/**
 * Compound component for grouping primary and secondary hero call-to-action buttons.
 */
export const HeroActions = Object.assign(HeroActionsBase, {
	CTA: HeroCTA,
});
