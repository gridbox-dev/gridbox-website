/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { CTA } from '@/components/ui/cta';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { MenuButton } from '@/components/ui/menu-button';
import type { InferDictionary } from '@/config/i18n';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'flex items-center justify-end gap-2 h-fit w-fit shrink-0 tablet:gap-8 laptop:flex-row-reverse',
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
 * Properties for the {@link Actions} header actions component.
 * Extends base `div` props while omitting polymorphic properties, children, and content overrides in favor of dictionary bindings.
 */
export interface ActionsProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children' | 'content'> {
	/**
	 * Actions subsection dictionary inferred from header i18n content.
	 */
	content: InferDictionary<'header'>['actions'];
}

/**
 * Header actions container component rendering localized call-to-action buttons, language switcher, and mobile menu trigger.
 * Manages responsive visibility progressive enhancement via Tailwind Variants slots.
 *
 * @param props - Component configuration options defined by {@link ActionsProps}.
 * @returns The rendered header actions container element.
 */
export const Actions = (props: ActionsProps): JSX.Element => {
	const { content, className, ...rest } = props;
	const { base, cta } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-header='actions' className={base({ className })}>
			<LanguageSwitcher aria-label={content.languageSwitcher.ariaLabel} />

			<CTA
				hierarchy='conversion'
				aria-label={content.conversion.ariaLabel}
				size='sm'
				className={cta({ hierarchy: 'conversion' })}
			>
				{content.conversion.label}
			</CTA>

			<CTA
				hierarchy='scheduling'
				aria-label={content.scheduling.ariaLabel}
				size='sm'
				className={cta({ hierarchy: 'scheduling' })}
			>
				{content.scheduling.label}
			</CTA>

			<MenuButton aria-label={content.mobileMenu.ariaLabel} />
		</Box>
	);
};
