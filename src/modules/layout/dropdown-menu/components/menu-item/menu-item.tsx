/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box } from '@/components/base/box';
import { Link, type LinkProps } from '@/components/base/link';
import { Text } from '@/components/base/text';
import { tv } from '@/config/ui/tw-variants';
import { MenuItemIcon } from '@/modules/layout/dropdown-menu/components/menu-item/menu-item-icon';
import type { ComponentIcon } from '@/types/components';

const styles = tv({
	slots: {
		base: 'block h-fit w-full',
		inner: [
			'group flex items-center gap-12 h-fit w-full p-12 rounded-10 bg-primary',
			'whitespace-nowrap outline-brand transition duration-100 ease-linear select-none',
			'focus-visible:outline-2 focus-visible:outline-offset-2',
			'hover:bg-primary_hover',
		].join(' '),
		content: 'flex flex-col h-fit w-full',
		text: 'w-full text-copy-14',
	},

	variants: {
		as: {
			title: {
				text: 'font-medium text-primary',
			},
			description: {
				text: 'text-tertiary',
			},
		},
	},
});

/**
 * Properties for the {@link MenuItem} component.
 * Extends base primitive `a` link props while omitting polymorphic properties
 * in favor of targeted slot styling and explicit megamenu content parameters.
 */
export interface MenuItemProps extends Omit<LinkProps<'a'>, 'as' | 'asChild' | 'className' | 'children'> {
	/**
	 * Primary title text displayed within the megamenu item link.
	 */
	title: string;

	/**
	 * Optional secondary description text providing contextual details about the target page.
	 */
	description?: string;

	/**
	 * Icon component or React element to render within the decorated container.
	 */
	icon?: ComponentIcon;

	/**
	 * Custom class names for the list wrapper, link anchor, content box, title, and description slots.
	 */
	classNames?: {
		/**
		 * Override classes applied to the outer list item `li` slot.
		 */
		outer?: string;

		/**
		 * Override classes applied to the inner navigation anchor `a` slot.
		 */
		inner?: string;

		/**
		 * Override classes applied to the text content wrapper `span` slot.
		 */
		content?: string;

		/**
		 * Override classes applied to the primary title text `span` slot.
		 */
		title?: string;

		/**
		 * Override classes applied to the description text `span` slot.
		 */
		description?: string;
	};
}

/**
 * Atomic megamenu navigation link item component.
 * Renders an accessible `li > a` block containing title and description texts
 * with custom hover/focus-visible state styles and slot-based class name overrides.
 *
 * @param props - Component configuration options defined by {@link MenuItemProps}.
 * @returns The rendered megamenu navigation item element.
 */
export const MenuItem = (props: MenuItemProps): JSX.Element => {
	const { title, description, icon, classNames, ...rest } = props;
	const { base, inner, content, text } = styles();

	return (
		<Box as='li' data-menu='item-outer' className={base({ className: classNames?.outer })}>
			<Link {...(rest as LinkProps<'a'>)} data-menu='item-inner' className={inner({ className: classNames?.inner })}>
				{icon && <MenuItemIcon icon={icon} />}

				<Box as='span' data-menu='item-content' className={content({ className: classNames?.content })}>
					<Text as='span' data-menu='item-title' className={text({ className: classNames?.title, as: 'title' })}>
						{title}
					</Text>

					<Text
						as='span'
						data-menu='item-description'
						className={text({ className: classNames?.description, as: 'description' })}
					>
						{description}
					</Text>
				</Box>
			</Link>
		</Box>
	);
};
