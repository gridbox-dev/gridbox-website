/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithRef, CSSProperties, ElementType, JSX, Ref } from 'react';
import {
	type AriaTextFieldProps,
	type HoverProps,
	mergeProps,
	useFocusRing,
	useHover,
	useObjectRef,
	useTextField,
} from 'react-aria';

import { handleTheme } from '@/handlers/client/handle-theme';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Input} component.
 */
type InputBaseProps = BaseComponent &
	AriaTextFieldProps &
	HoverProps & {
		/**
		 * When true, delegates rendering to its direct child via Radix UI Slot,
		 * merging props, ref, and event handlers onto that child.
		 * @default false
		 */
		asChild?: boolean;

		/**
		 * Additional CSS class name to apply to the input element.
		 */
		className?: string;

		/**
		 * Inline CSS properties.
		 */
		style?: CSSProperties;
	};

/**
 * Polymorphic props for the {@link Input} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while preserving React Aria text field accessibility and validation properties.
 */
export type InputProps<E extends ElementType = 'input'> = InputBaseProps & {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link InputProps.asChild | asChild} is true.
	 * @default 'input'
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof InputBaseProps | 'as'>;

/**
 * Low-level interactive input primitive.
 * Combines full polymorphism (`as` / `asChild`) with React Aria accessibility hooks,
 * exposing interaction and validation states via DOM `data-*` attributes and supporting theme switching.
 *
 * @param props - Component configuration conforming to {@link InputProps}.
 * @returns The rendered interactive input element or slotted node.
 */
export const Input = <E extends ElementType = 'input'>(props: InputProps<E>): JSX.Element => {
	const { as, asChild = false, dark, className, ref, isDisabled, isReadOnly, isRequired, isInvalid, ...rest } = props;

	const inputRef = useObjectRef(ref as Ref<HTMLInputElement>);

	const Comp = (asChild ? Slot : as || 'input') as ElementType;
	const ariaElementType = asChild ? 'span' : typeof as === 'string' ? as : 'input';

	const { inputProps } = useTextField(
		{
			...rest,
			isDisabled,
			isReadOnly,
			isRequired,
			validationState: isInvalid ? 'invalid' : 'valid',
			inputElementType: ariaElementType as 'input',
		},
		inputRef,
	);

	const { focusProps, isFocusVisible, isFocused } = useFocusRing(rest);
	const { hoverProps, isHovered } = useHover({
		isDisabled: isDisabled || isReadOnly,
		onHoverStart: props.onHoverStart,
		onHoverEnd: props.onHoverEnd,
		onHoverChange: props.onHoverChange,
	});

	const mergedProps = mergeProps(inputProps, focusProps, hoverProps);

	return (
		<Comp
			{...mergedProps}
			ref={inputRef}
			data-primitive='input'
			data-hovered={isHovered || undefined}
			data-focused={isFocused || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-disabled={isDisabled || undefined}
			data-readonly={isReadOnly || undefined}
			data-required={isRequired || undefined}
			data-invalid={isInvalid || undefined}
			className={handleTheme(dark, className)}
		/>
	);
};
