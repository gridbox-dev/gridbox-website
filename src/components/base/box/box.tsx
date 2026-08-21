/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Slot } from '@radix-ui/react-slot';
import { kx } from 'klsx';

import type { ComponentPropsWithRef, ElementType, JSX } from 'react';
import type { HandledComponent, Theme } from '@/types/common/components';

/**
 * Props for the {@link Box} component.
 * @extends ComponentPropsWithRef<'div'>
 */
interface BoxProps extends ComponentPropsWithRef<'div'> {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link BoxProps.asChild | asChild} is true.
	 */
	as?: ElementType;

	/**
	 * When true, delegates rendering to its direct child via Radix UI Slot,
	 * merging props, ref, and event handlers onto that child.
	 */
	asChild?: boolean;

	/**
	 * Theme context modifier for the component.
	 * When set to dark, appends the dark-mode utility class to the node.
	 */
	theme?: Theme;
}

/**
 * Low-level layout primitives element that serves as a flexible wrapper block.
 * Supports semantic element customization via 'as' or prop delegation via 'asChild',
 * along with built-in theme mode switching.
 * @param props - Component configuration and HTML attributes.
 * @returns The rendered React element or slot.
 */
const Box = (props: BoxProps): JSX.Element => {
	const {
		as: Component = 'div',
		asChild = false,
		theme = 'light',
		children,
		className,
		...rest
	} = props;

	const Comp = asChild ? Slot : Component;

	return (
		<Comp {...rest} className={kx(className, theme === 'dark' && 'dark-mode') || undefined}>
			{children}
		</Comp>
	);
};

(Box as HandledComponent).componentId = 'Box';
(Box as HandledComponent).componentLayer = 'base';

export { Box, type BoxProps };
