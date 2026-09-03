/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import type { ComponentPropsWithRef, ElementType, JSX, Ref } from 'react';
import { type SeparatorProps as RACSeparatorProps, useObjectRef, useSeparator } from 'react-aria';

import { handleTheme } from '@/handlers/client/handle-theme';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Separator} component.
 */
type SeparatorBaseProps = BaseComponent &
	RACSeparatorProps & {
		/**
		 * When true, delegates rendering to its direct child via Radix UI Slot,
		 * merging props, ref, and event handlers onto that child.
		 * @default false
		 */
		asChild?: boolean;

		/**
		 * Additional CSS class name to apply to the separator element.
		 */
		className?: string;
	};

/**
 * Polymorphic props for the {@link Separator} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while preserving React Aria separator orientation and accessibility properties.
 */
export type SeparatorProps<E extends ElementType = 'hr'> = SeparatorBaseProps & {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link SeparatorProps.asChild | asChild} is true.
	 * Defaults to 'hr' for horizontal orientation and 'div' for vertical.
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof SeparatorBaseProps | 'as'>;

/**
 * Low-level accessibility-first separator primitive component.
 * Integrates React Aria's `useSeparator` hook to provide semantic divider roles,
 * exposes orientation states via DOM `data-*` attributes, and supports full polymorphism
 * (`as` / `asChild`) along with theme switching.
 *
 * @param props - Component configuration and HTML attributes conforming to {@link SeparatorProps}.
 * @returns The rendered accessible separator element or slotted node.
 */
export const Separator = <E extends ElementType = 'hr'>(props: SeparatorProps<E>): JSX.Element => {
	const {
		as,
		asChild = false,
		elementType,
		orientation = 'horizontal',
		dark,
		children,
		className,
		ref,
		...rest
	} = props;

	const objectRef = useObjectRef(ref as Ref<HTMLElement>);

	const defaultElement = orientation === 'vertical' ? 'div' : 'hr';
	const Comp = (asChild ? Slot : as || defaultElement) as ElementType;
	const ariaElementType = asChild ? 'div' : typeof as === 'string' ? as : elementType || defaultElement;

	const { separatorProps } = useSeparator({
		...rest,
		elementType: ariaElementType,
		orientation,
	});

	return (
		<Comp
			{...separatorProps}
			{...rest}
			ref={objectRef}
			data-primitive='separator'
			data-orientation={orientation}
			className={handleTheme(dark, className)}
		>
			{children}
		</Comp>
	);
};
