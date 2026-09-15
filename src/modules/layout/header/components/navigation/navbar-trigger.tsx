/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { type JSX, useCallback } from 'react';
import { Chevron } from '@/assets/icons/chevron';
import { Box } from '@/components/base/box';
import { Button, type ButtonProps } from '@/components/ui/button';
import { tv } from '@/config/ui/tw-variants';
import { type NavbarOpenedItem, useNavbarStore } from '@/stores/navbar-store';
import { usePopupStore } from '@/stores/popup-store';

const styles = tv({
	base: [
		'gap-2 p-6',
		'*:data-icon:transition *:data-icon:duration-150 *:data-icon:ease-linear',
		'data-opened:text-tertiary_hover data-opened:bg-primary_hover',
		'data-opened:*:data-icon:rotate-180 data-opened:*:data-icon:text-fg-quaternary_hover',
	].join(' '),
});

/**
 * Properties for the {@link NavbarTrigger} component.
 * Extends base {@link ButtonProps} while omitting fixed variants, layout properties, and event handlers
 * managed directly by the navigation state controller.
 */
export interface NavbarTriggerProps
	extends Omit<
		ButtonProps<'button'>,
		'as' | 'asChild' | 'size' | 'variant' | 'iconLeading' | 'iconTrailing' | 'onPress' | 'aria-haspopup' | 'className'
	> {
	/**
	 * Unique identifier string mapping this trigger to its corresponding megamenu overlay block.
	 */
	value: string;

	/**
	 * Custom class names for the outer list item container and inner interactive button trigger.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer wrapper `li` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner interactive `button` slot.
		 */
		trigger?: string;
	};
}

/**
 * Interactive list item trigger component for toggling category megamenus in the main header navigation.
 * Renders an accessible button element with trailing chevron indicators and dynamic state-bound data attributes.
 *
 * @param props - Component configuration options defined by {@link NavbarTriggerProps}.
 * @returns The rendered list item wrapper containing the interactive trigger button.
 */
export const NavbarTrigger = (props: NavbarTriggerProps): JSX.Element => {
	const { children, value, classNames, ...rest } = props;

	const openedItem = useNavbarStore((s) => s.openedItem);
	const openedPopup = usePopupStore((s) => s.openedPopup);

	const toggleItem = useNavbarStore((s) => s.toggle);
	const togglePopup = usePopupStore((s) => s.toggle);

	const handlePress = useCallback(() => {
		toggleItem(value as NavbarOpenedItem);

		if (openedPopup !== 'header-nav-dropdown' || openedItem === value) {
			togglePopup('header-nav-dropdown');
		}
	}, [openedItem, openedPopup, toggleItem, togglePopup, value]);

	const isOpen = openedItem === value && openedPopup === 'header-nav-dropdown';

	return (
		<Box as='li' data-header='navbar-trigger-wrapper' className={classNames?.outer}>
			<Button
				{...(rest as ButtonProps<'button'>)}
				as='button'
				data-header='navbar-trigger'
				aria-haspopup='true'
				aria-expanded={isOpen}
				data-opened={isOpen || undefined}
				onPress={handlePress}
				size='xs'
				variant='ghost'
				iconTrailing={Chevron}
				className={styles({ className: classNames?.trigger })}
			>
				{children}
			</Button>
		</Box>
	);
};
