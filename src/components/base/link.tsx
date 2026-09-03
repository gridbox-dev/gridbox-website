/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import type { Route } from 'next';
import NextLink from 'next/link';
import type { ComponentPropsWithRef, CSSProperties, ElementType, JSX, Ref } from 'react';
import {
	type AriaLinkProps,
	type HoverProps,
	mergeProps,
	useFocusRing,
	useHover,
	useLink,
	useObjectRef,
} from 'react-aria';
import { extractAriaProps } from '@/handlers/client/extract-aria-props';
import { handleTheme } from '@/handlers/client/handle-theme';
import { useLinkPrefetch } from '@/hooks/use-link-prefetch';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Link} component.
 */
type LinkBaseProps = BaseComponent &
	Omit<AriaLinkProps, 'href'> &
	HoverProps & {
		/**
		 * Unique HTML attribute identifier.
		 */
		id?: string;

		/**
		 * Target navigation route path or external URL string.
		 */
		href: Route | string;

		/**
		 * When true, delegates rendering to its direct child via Radix UI Slot,
		 * merging props, ref, and event handlers onto that child.
		 * @default false
		 */
		asChild?: boolean;

		/**
		 * Additional CSS class name to apply to the link element.
		 */
		className?: string;

		/**
		 * Inline CSS properties.
		 */
		style?: CSSProperties;
	};

/**
 * Polymorphic props for the {@link Link} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while preserving React Aria link interaction and Next.js routing properties.
 */
export type LinkProps<E extends ElementType = typeof NextLink> = LinkBaseProps & {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link LinkProps.asChild | asChild} is true.
	 * @default NextLink
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof LinkBaseProps | 'as'>;

/**
 * Low-level interactive navigation link primitive.
 * Combines full polymorphism (`as` / `asChild`) with React Aria accessibility hooks,
 * Next.js route prefetching, DOM `data-*` interaction states, and theme switching.
 *
 * @param props - Component configuration and HTML attributes.
 * @returns The rendered interactive link element or slotted node.
 */
export const Link = <E extends ElementType = typeof NextLink>(props: LinkProps<E>): JSX.Element => {
	const { href, as, asChild = false, dark, children, className, ref, ...rest } = props;
	const { handlePrefetch } = useLinkPrefetch(href);

	const objectRef = useObjectRef(ref as Ref<HTMLElement>);

	const Comp = (asChild ? Slot : as || NextLink) as ElementType;
	const ariaElementType = asChild ? 'span' : typeof as === 'string' ? as : 'a';

	const { linkProps, isPressed } = useLink({ ...rest, elementType: ariaElementType }, objectRef);
	const { focusProps, isFocusVisible, isFocused } = useFocusRing(rest);
	const { hoverProps, isHovered } = useHover({
		...rest,
		onHoverStart: (e) => {
			handlePrefetch();
			rest.onHoverStart?.(e);
		},
	});

	const ariaProps = extractAriaProps(rest);
	const mergedProps = mergeProps(linkProps, focusProps, hoverProps, ariaProps);

	const isNextLink = !asChild && (!as || as === NextLink);
	const nextLinkProps = isNextLink ? { prefetch: false, scroll: false } : {};

	return (
		<Comp
			{...mergedProps}
			{...nextLinkProps}
			ref={objectRef}
			href={href}
			data-primitive='link'
			data-hovered={isHovered || undefined}
			data-focused={isFocused || undefined}
			data-focus-visible={isFocusVisible || undefined}
			data-pressed={isPressed || undefined}
			data-disabled={props.isDisabled || undefined}
			className={handleTheme(dark, className)}
		>
			{children}
		</Comp>
	);
};
