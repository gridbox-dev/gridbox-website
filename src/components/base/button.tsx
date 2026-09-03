/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithRef, CSSProperties, ElementType, JSX, Ref } from 'react';
import {
	type AriaButtonProps,
	type HoverProps,
	mergeProps,
	useButton,
	useFocusRing,
	useHover,
	useObjectRef,
} from 'react-aria';
import { handleTheme } from '@/handlers/client/handle-theme';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Button} component.
 */
type ButtonBaseProps = BaseComponent &
	AriaButtonProps &
	HoverProps & {
		/**
		 * When true, delegates rendering to its direct child via Radix UI Slot,
		 * merging props, ref, and event handlers onto that child.
		 * @default false
		 */
		asChild?: boolean;

		/**
		 * Additional CSS class name to apply to the button element.
		 */
		className?: string;

		/**
		 * Inline CSS properties.
		 */
		style?: CSSProperties;
	};

/**
 * Polymorphic props for the {@link Button} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while preserving React Aria button interaction properties.
 */
export type ButtonProps<E extends ElementType = 'button'> = ButtonBaseProps & {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link ButtonProps.asChild | asChild} is true.
	 * @default 'button'
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof ButtonBaseProps | 'as'>;

/**
 * Low-level interactive button primitive.
 * Combines full polymorphism (`as` / `asChild`) with React Aria accessibility hooks,
 * exposing interaction states as DOM `data-*` attributes and supporting theme switching.
 *
 * @param props - Component configuration and HTML attributes.
 * @returns The rendered interactive element or slotted node.
 */
export const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
	const { as, asChild = false, dark, children, className, ref, ...rest } = props;

	const objectRef = useObjectRef(ref as Ref<HTMLElement>);

	const elementType: ElementType = asChild ? 'span' : as || 'button';
	const Comp = (asChild ? Slot : as || 'button') as ElementType;

	const { buttonProps, isPressed } = useButton({ ...rest, elementType }, objectRef);
	const { focusProps, isFocusVisible, isFocused } = useFocusRing(rest);
	const { hoverProps, isHovered } = useHover(rest);

	const mergedProps = mergeProps(buttonProps, focusProps, hoverProps);

	return (
		<Comp
			{...mergedProps}
			ref={objectRef}
			data-primitive='button'
			data-hovered={isHovered || undefined}
			data-focused={isFocused || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-pressed={isPressed || undefined}
			className={handleTheme(dark, className)}
		>
			{children}
		</Comp>
	);
};
