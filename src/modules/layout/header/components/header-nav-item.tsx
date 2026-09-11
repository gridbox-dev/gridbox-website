/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Chevron } from '@/assets/icons/chevron';
import { Link, type LinkProps } from '@/components/base/link';
import { Button, type ButtonProps } from '@/components/ui/button';
import { tv } from '@/config/ui/tw-variants';
import { useHeaderNavStore } from '../stores/header-nav-store';

const styles = tv({
	slots: {
		base: [
			'gap-2',
			'*:data-icon:transition *:data-icon:duration-150 *:data-icon:ease-linear',
			'data-opened:text-tertiary_hover data-opened:bg-primary_hover data-opened:*:data-icon:text-fg-quaternary_hover',
		].join(' '),
	},

	variants: {
		isOpen: {
			true: {
				base: '*:data-icon:rotate-180',
			},
		},
	},
});

/**
 * Base props common to all {@link HeaderNavItem} variants.
 */
type HeaderNavItemBaseProps = Omit<
	ButtonProps,
	'as' | 'asChild' | 'size' | 'variant' | 'iconLeading' | 'iconTrailing' | 'onPress'
>;

/**
 * Props for the button variant of {@link HeaderNavItem}.
 */
export type HeaderNavItemButtonProps = HeaderNavItemBaseProps & {
	/**
	 * Renders the item as an interactive HTML button node.
	 * @default 'button'
	 */
	as?: 'button';

	/**
	 * Unique identifier required to manage the open/close state in the navigation store.
	 */
	id?: string;
};

/**
 * Props for the navigation anchor variant of {@link HeaderNavItem}.
 */
export type HeaderNavItemLinkProps = HeaderNavItemBaseProps &
	Omit<LinkProps, keyof HeaderNavItemBaseProps | 'as'> & {
		/**
		 * Renders the item as a client-side navigation link component.
		 */
		as: 'a';
	};

/**
 * Discriminated union of valid properties for {@link HeaderNavItem}.
 */
export type HeaderNavItemProps = HeaderNavItemButtonProps | HeaderNavItemLinkProps;

/**
 * Individual header navigation item component.
 * Polymorphically renders either an accessible ghost action button with a dropdown indicator
 * or a direct client-side routing link.
 *
 * @param props - Component options conforming to {@link HeaderNavItemProps}.
 * @returns The rendered navigation item node.
 */
export const HeaderNavItem = (props: HeaderNavItemProps): JSX.Element => {
	const { base } = styles();
	const openedItem = useHeaderNavStore((s) => s.openedItem);
	const toggle = useHeaderNavStore((s) => s.toggle);

	if (props.as === 'a') {
		const { as, children, className, ...linkProps } = props;

		return (
			<Button asChild size='xs' variant='ghost' className={className}>
				<Link {...(linkProps as LinkProps<'a'>)}>{children}</Link>
			</Button>
		);
	}

	const { as, children, id, className, ...buttonProps } = props;
	const isOpen = Boolean(id && openedItem === id);

	return (
		<Button
			{...(buttonProps as ButtonProps<'button'>)}
			as='button'
			size='xs'
			variant='ghost'
			iconTrailing={Chevron}
			data-opened={isOpen || undefined}
			onPress={() => toggle(id)}
			className={base({ isOpen, className })}
		>
			{children}
		</Button>
	);
};
