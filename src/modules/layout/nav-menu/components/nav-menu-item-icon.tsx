/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { isValidElement, type JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { isReactComponent } from '@/handlers/client/is-react-component';
import type { ComponentIcon } from '@/types/components';

const styles = tv({
	slots: {
		base: [
			'relative overflow-hidden shrink-0 flex items-center justify-center size-40 shadow-xs-skeuomorphic bg-linear-to-tr from-bg-tertiary to-bg-secondary rounded-8 transition duration-100 ease-linear',
			'*:data-icon:relative *:data-icon:z-20 *:data-icon:size-20 *:data-icon:stroke-[1.75px] *:data-icon:transition *:data-icon:duration-100 *:data-icon:ease-linear *:data-icon:text-fg-tertiary group-hover:*:data-icon:text-fg-tertiary_hover',
		].join(' '),
		icon: 'relative z-20 size-20 stroke-[1.75px] transition duration-100 ease-linear text-fg-tertiary group-hover:text-fg-tertiary_hover',
		line: 'absolute z-0',
	},

	variants: {
		position: {
			start: {
				line: undefined,
			},
			end: {
				line: undefined,
			},
		},
		direction: {
			horizontal: {
				line: undefined,
			},
			vertical: {
				line: undefined,
			},
		},
	},

	compoundVariants: [
		{ position: 'start', direction: 'horizontal', class: { line: 'top-8 h-px w-full bg-utility-neutral-200/70' } },
		{ position: 'end', direction: 'horizontal', class: { line: 'bottom-8 h-px w-full bg-utility-neutral-200/70' } },
		{ position: 'start', direction: 'vertical', class: { line: 'left-8 h-full w-px bg-utility-neutral-200/70' } },
		{ position: 'end', direction: 'vertical', class: { line: 'right-8 h-full w-px bg-utility-neutral-200/70' } },
	],
});

/**
 * Properties for the {@link NavMenuItemIcon} component.
 * Extends primitive `div` element props while omitting polymorph controls and child nodes.
 */
export interface NavMenuItemIconProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children'> {
	/**
	 * Icon component or React element to render within the decorated container.
	 */
	icon?: ComponentIcon;
}

/**
 * Visual container component for displaying navigation item icons with decorative grid lines.
 * Renders a skeuomorphic icon badge hidden from assistive technologies (`aria-hidden="true"`).
 *
 * @param props - Component configuration options defined by {@link NavMenuItemIconProps}.
 * @returns The rendered icon badge node with decorative structural accents.
 */
export const NavMenuItemIcon = (props: NavMenuItemIconProps): JSX.Element => {
	const { icon: Icon, className, ...rest } = props;
	const { base, icon, line } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' aria-hidden='true' className={base({ className })}>
			{isValidElement(Icon) && Icon}
			{isReactComponent(Icon) && <Icon data-icon className={icon()} />}

			<Box as='div' className={line({ position: 'start', direction: 'horizontal' })} />
			<Box as='div' className={line({ position: 'end', direction: 'horizontal' })} />
			<Box as='div' className={line({ position: 'start', direction: 'vertical' })} />
			<Box as='div' className={line({ position: 'end', direction: 'vertical' })} />
		</Box>
	);
};
