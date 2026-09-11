/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Box } from '@/components/base/box';
import { Button, type ButtonProps } from '@/components/ui/button';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'laptop:hidden shadow-none',
		icon: 'relative flex flex-col items-center justify-center gap-6 size-20',
		lineTop:
			'h-[1.9px] w-full bg-fg-quaternary rounded-full transition-transform duration-200 ease-in-out origin-center',
		lineBottom:
			'h-[1.9px] w-full bg-fg-quaternary rounded-full transition-transform duration-200 ease-in-out origin-center',
	},

	variants: {
		isOpen: {
			true: {
				lineTop: 'translate-y-[4px] rotate-45',
				lineBottom: 'translate-y-[-4px] -rotate-45',
			},
			false: {
				lineTop: 'translate-y-0 rotate-0',
				lineBottom: 'translate-y-0 rotate-0',
			},
		},
	},

	defaultVariants: {
		isOpen: false,
	},
});

/**
 * Properties for the {@link MenuButton} navigation component.
 * Extends base {@link ButtonProps} while omitting element polymorphism, preset variants,
 * structural children, aria controls, and explicit icon slots.
 */
export type MenuButtonProps = Omit<
	ButtonProps<'button'>,
	| 'as'
	| 'asChild'
	| 'size'
	| 'variant'
	| 'aria-controls'
	| 'aria-haspopup'
	| 'children'
	| 'iconLeading'
	| 'iconTrailing'
>;

/**
 * Properties for the {@link MenuButtonIcon} internal indicator component.
 */
export interface MenuButtonIconProps {
	/**
	 * Toggles the animated state of the hamburger icon lines into a close cross.
	 * @default false
	 */
	isOpen?: boolean;
}

/**
 * Internal hamburger icon component that visually morphs two parallel lines
 * into a close cross indicator based on the active menu state.
 *
 * @param props - Component options conforming to {@link MenuButtonIconProps}.
 * @returns The rendered animated icon container node.
 */
const MenuButtonIcon = (props: MenuButtonIconProps): JSX.Element => {
	const { isOpen } = props;
	const { icon, lineTop, lineBottom } = styles({ isOpen });

	return (
		<Box as='span' className={icon()}>
			<Box as='span' className={lineTop()} />
			<Box as='span' className={lineBottom()} />
		</Box>
	);
};

/**
 * Mobile navigation menu toggle button component.
 * Renders a ghost button containing an animated hamburger icon for mobile and tablet viewports.
 *
 * @param props - Component options conforming to {@link MenuButtonProps}.
 * @returns The rendered mobile menu trigger button node.
 */
export const MenuButton = (props: MenuButtonProps): JSX.Element => {
	const { className, ...rest } = props;
	const { base } = styles();

	// This is for testing purposes until we have the Zustand Store.
	const isOpen = false;

	return (
		<Button
			{...(rest as ButtonProps<'button'>)}
			as='button'
			aria-haspopup='menu'
			aria-controls='mobile-menu'
			aria-expanded={isOpen || undefined}
			size='sm'
			variant='ghost'
			className={base({ className })}
			iconLeading={<MenuButtonIcon isOpen={isOpen} />}
		/>
	);
};
