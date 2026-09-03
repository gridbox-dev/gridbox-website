/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import {
	type ComponentPropsWithRef,
	type CSSProperties,
	type ElementType,
	type JSX,
	type Ref,
	useEffect,
	useState,
} from 'react';
import { useObjectRef } from 'react-aria';
import { createPortal } from 'react-dom';

import { handleTheme } from '@/handlers/client/handle-theme';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Portal} component.
 */
type PortalBaseProps = BaseComponent & {
	/**
	 * Target DOM HTMLElement node or container function where children should be rendered.
	 * Defaults to `document.body` once hydrated on the client.
	 */
	container?: HTMLElement | null | (() => HTMLElement | null);

	/**
	 * When true, delegates rendering to its direct child via Radix UI Slot,
	 * merging props, ref, and event handlers onto that child.
	 * @default false
	 */
	asChild?: boolean;

	/**
	 * Additional CSS class name to apply to the portal wrapper element.
	 */
	className?: string;

	/**
	 * Inline CSS properties.
	 */
	style?: CSSProperties;
};

/**
 * Polymorphic props for the {@link Portal} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while supporting custom portal target containers.
 */
export type PortalProps<E extends ElementType = 'div'> = PortalBaseProps & {
	/**
	 * The HTML element or React component to render as the root portal wrapper.
	 * Ignored when {@link PortalProps.asChild | asChild} is true.
	 * @default 'div'
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof PortalBaseProps | 'as'>;

/**
 * Low-level portal primitive component.
 * Renders its children into a specified DOM node outside the parent component hierarchy
 * (by default `document.body`) while maintaining React event bubbling and SSR hydration safety.
 *
 * @param props - Component configuration conforming to {@link PortalProps}.
 * @returns The rendered React portal node or null during SSR / pre-hydration.
 */
export const Portal = <E extends ElementType = 'div'>(props: PortalProps<E>): JSX.Element | null => {
	const { as, asChild = false, container, dark, children, className, ref, ...rest } = props;

	const [mounted, setMounted] = useState<boolean>(false);
	const portalRef = useObjectRef(ref as Ref<HTMLElement>);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const targetContainer =
		(typeof container === 'function' ? container() : container) ||
		(typeof document !== 'undefined' ? document.body : null);

	if (!targetContainer) return null;

	const Comp = (asChild ? Slot : as || 'div') as ElementType;

	return createPortal(
		<Comp {...rest} ref={portalRef} data-primitive='portal' className={handleTheme(dark, className)}>
			{children}
		</Comp>,
		targetContainer,
	);
};
