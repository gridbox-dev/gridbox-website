/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { isValidElement, type JSX } from 'react';
import { Box } from '@/components/base/box';
import { Link, type LinkProps } from '@/components/base/link';
import { tv } from '@/config/ui/tw-variants';
import { isReactComponent } from '@/handlers/client/is-react-component';
import type { ComponentIcon } from '@/types/components';

const styles = tv({
	slots: {
		base: [
			'group flex gap-12 h-fit w-full p-12 rounded-8',
			'whitespace-nowrap outline-brand transition duration-100 ease-linear select-none',
			'focus-visible:outline-2 focus-visible:outline-offset-2',
			'hover:bg-primary_hover',
		].join(' '),
		inner: 'flex flex-col gap-2 h-fit w-full',
	},
});

/**
 * Properties for the {@link NavMenuLinkItem} navigation link component.
 * Extends base interactive {@link LinkProps} while omitting polymorph controls.
 */
export interface NavMenuLinkItemProps extends Omit<LinkProps, 'as' | 'asChild'> {
	/**
	 * Icon component or pre-rendered React node displayed alongside the link text content.
	 */
	icon?: ComponentIcon;
}

/**
 * Interactive link component for rendering individual navigation entries within dropdown blocks.
 * Combines full focus/hover states with an optional leading icon badge and structured content container.
 *
 * @param props - Component configuration options defined by {@link NavMenuLinkItemProps}.
 * @returns The rendered interactive navigation item node.
 */
export const NavMenuLinkItem = (props: NavMenuLinkItemProps): JSX.Element => {
	const { icon: Icon, children, className, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Link {...rest} data-menu='link-item' className={base({ className })}>
			{isValidElement(Icon) && Icon}
			{isReactComponent(Icon) && <Icon data-icon />}

			<Box as='div' data-menu='link-item-content' className={inner()}>
				{children}
			</Box>
		</Link>
	);
};
