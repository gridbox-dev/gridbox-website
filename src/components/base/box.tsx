/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithRef, ElementType, JSX } from 'react';
import { handleTheme } from '@/handlers/client/handle-theme';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Box} component.
 */
type BoxBaseProps = BaseComponent & {
	/**
	 * When true, delegates rendering to its direct child via Radix UI Slot,
	 * merging props, ref, and event handlers onto that child.
	 * @default false
	 */
	asChild?: boolean;
};

/**
 * Polymorphic props for the {@link Box} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop.
 */
export type BoxProps<E extends ElementType = 'div'> = BoxBaseProps & {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link BoxProps.asChild | asChild} is true.
	 * @default 'div'
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof BoxBaseProps | 'as'>;

/**
 * Low-level layout primitives element that serves as a flexible wrapper block.
 * Supports semantic element customization via 'as' or prop delegation via 'asChild',
 * along with built-in theme mode switching.
 *
 * @param props - Component configuration and HTML attributes.
 * @returns The rendered React element or slot.
 */
export const Box = <E extends ElementType = 'div'>(props: BoxProps<E>): JSX.Element => {
	const { as, asChild = false, dark, children, className, ...rest } = props;

	const Comp = asChild ? Slot : as || 'div';

	return (
		<Comp {...rest} data-primitive='box' className={handleTheme(dark, className)}>
			{children}
		</Comp>
	);
};
