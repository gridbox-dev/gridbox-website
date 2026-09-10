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
			'flex items-center justify-center w-full aspect-square max-w-36',
			'*:data-icon:size-20 *:data-icon:stroke-[1.67px]',
		].join(' '),
		icon: 'size-20 stroke-[1.67px]',
	},

	variants: {
		isActive: {
			true: {
				base: '*:data-icon:text-fg-tertiary',
				icon: 'text-fg-tertiary',
			},

			false: {
				base: '*:data-icon:text-fg-quaternary/60',
				icon: 'text-fg-quaternary/60',
			},
		},
	},
});

/**
 * Properties for the {@link SidebarNavButton} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export interface SidebarNavButtonProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children'> {
	/**
	 * Icon component or JSX element to be rendered inside the button container.
	 */
	icon: ComponentIcon;

	/**
	 * Toggles the active state styling for the icon element.
	 * @default false
	 */
	isActive?: boolean;
}

/**
 * Action button item for the sidebar navigation bar.
 * Polymorphically resolves provided icon types and applies active state color styling.
 *
 * @param props - The component props defined by {@link SidebarNavButtonProps}.
 * @returns The rendered sidebar navigation button node.
 */
export const SidebarNavButton = (props: SidebarNavButtonProps): JSX.Element => {
	const { icon: Icon, isActive, className, ...rest } = props;
	const { base, icon } = styles({ isActive });

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='nav-button' className={base({ className })}>
			{isValidElement(Icon) && Icon}
			{isReactComponent(Icon) && <Icon data-icon className={icon()} />}
		</Box>
	);
};
