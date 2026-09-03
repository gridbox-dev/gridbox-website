/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import kx from 'klsx';
import type { ComponentPropsWithRef, ElementType, JSX } from 'react';
import { type VisuallyHiddenProps as RACVisuallyHiddenProps, useVisuallyHidden } from 'react-aria';

/**
 * Base props specific to the {@link VisuallyHidden} component.
 */
type VisuallyHiddenBaseProps = RACVisuallyHiddenProps & {
	/**
	 * Optional DOM element identifier.
	 */
	id?: string;

	/**
	 * When true, delegates rendering to its direct child via Radix UI Slot,
	 * merging props, ref, and event handlers onto that child.
	 * @default false
	 */
	asChild?: boolean;

	/**
	 * Additional CSS class name to apply to the visually hidden element.
	 */
	className?: string;
};

/**
 * Polymorphic props for the {@link VisuallyHidden} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while preserving React Aria accessibility options.
 */
export type VisuallyHiddenProps<E extends ElementType = 'span'> = VisuallyHiddenBaseProps & {
	/**
	 * The underlying HTML element or React component to render when 'asChild' is false.
	 * @default 'span'
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof VisuallyHiddenBaseProps | 'as'>;

/**
 * Low-level utility primitive component that visually hides its children from the screen
 * while keeping them accessible to screen readers and assistive technologies.
 * Built on top of React Aria's hook and supporting polymorphic composition via Radix Slot.
 *
 * @param props - Component configuration and HTML attributes.
 * @returns The screen-reader-accessible React element or slotted node.
 */
export const VisuallyHidden = <E extends ElementType = 'span'>(props: VisuallyHiddenProps<E>): JSX.Element => {
	const { as, asChild = false, children, className, ...rest } = props;

	const Comp = (asChild ? Slot : as || 'span') as ElementType;
	const ariaElementType = asChild ? 'span' : typeof as === 'string' ? as : 'span';

	const { visuallyHiddenProps } = useVisuallyHidden({ ...rest, elementType: ariaElementType });

	return (
		<Comp {...visuallyHiddenProps} {...rest} data-primitive='visually-hidden' className={kx(className) || undefined}>
			{children}
		</Comp>
	);
};
