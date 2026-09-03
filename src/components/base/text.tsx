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
 * Allowed semantic HTML text elements.
 */
export type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong' | 'em' | 'label' | 'legend';

/**
 * Base props specific to the {@link Text} component.
 */
type TextBaseProps = BaseComponent & {
	/**
	 * When true, delegates rendering to its direct child via Radix UI Slot,
	 * merging props, ref, and event handlers onto that child.
	 * @default false
	 */
	asChild?: boolean;
};

/**
 * Polymorphic props for the {@link Text} component.
 * Allows inferring valid HTML attributes based on the 'as' typography element.
 */
export type TextProps<E extends TextElement = 'p'> = TextBaseProps & {
	/**
	 * The semantic text HTML element to render as the root node.
	 * Ignored when {@link TextProps.asChild | asChild} is true.
	 * @default 'p'
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof TextBaseProps | 'as'>;

/**
 * Low-level text primitive element for typography rendering.
 * Supports semantic element customization via 'as' or prop delegation via 'asChild',
 * along with built-in theme mode switching.
 *
 * @param props - Component configuration and HTML attributes.
 * @returns The rendered React element or slotted node.
 */
export const Text = <E extends TextElement = 'p'>(props: TextProps<E>): JSX.Element => {
	const { as, asChild = false, dark, children, className, ...rest } = props;

	const Comp = (asChild ? Slot : as || 'p') as ElementType;

	return (
		<Comp {...rest} data-primitive='text' className={handleTheme(dark, className)}>
			{children}
		</Comp>
	);
};
