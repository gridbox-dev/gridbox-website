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
		base: 'flex items-center justify-end gap-8 h-fit w-fit shrink-0',
		cta: 'hidden',
	},

	variants: {
		hierarchy: {
			scheduling: {
				cta: 'laptop:inline-flex',
			},

			conversion: {
				cta: 'tablet:inline-flex',
			},
		},
	},
});

/**
 * Properties for the {@link HeaderActions} compound layout component.
 * Extends base primitive `div` element props while omitting polymorph controls.
 */
export type HeaderActionsProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Props for the specialized {@link HeaderCTA} subcomponent.
 * Extends {@link CTAProps} while omitting `size` to enforce preset `sm` header sizing design tokens.
 */
export type HeaderCTAProps = Omit<CTAProps, 'size'>;

/**
 * Specialized call-to-action subcomponent for header sections.
 * Enforces `sm` sizing and responsive full-width layout on mobile viewports (`mobile:max-tablet:w-full`)
 * while applying namespaced attributes for testing and styling assertions.
 *
 * @param props - Configuration properties conforming to {@link HeaderCTAProps}.
 * @returns The rendered header call-to-action button node.
 */
const HeaderCTA = (props: HeaderCTAProps): JSX.Element => {
	const { children, className, hierarchy, ...rest } = props;
	const { cta } = styles();

	return (
		<CTA
			{...rest}
			hierarchy={hierarchy}
			size='sm'
			data-header={`${hierarchy}-cta`}
			className={cta({ className, hierarchy })}
		>
			{children}
		</CTA>
	);
};

/**
 * Base container component for primary top-level header call-to-action triggers and action buttons.
 * Align controls to the right end of the header layout with fixed compact spacing.
 *
 * @param props - Component options conforming to {@link HeaderActionsProps}.
 * @returns The rendered header actions wrapper node.
 */
const HeaderActionsBase = (props: HeaderActionsProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-header='actions' className={base({ className })}>
			{children}
		</Box>
	);
};

/**
 * Compound component grouping primary header actions and specialized CTA triggers.
 * Bundles the base action wrapper along with the {@link HeaderCTA} subcomponent.
 */
export const HeaderActions = Object.assign(HeaderActionsBase, {
	CTA: HeaderCTA,
});
