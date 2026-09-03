/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import NextImage, { type ImageProps as NextImageProps } from 'next/image';
import { type ComponentPropsWithRef, type CSSProperties, type ElementType, type JSX, type Ref, useState } from 'react';
import { useObjectRef } from 'react-aria';
import { handleTheme } from '@/handlers/client/handle-theme';
import type { BaseComponent } from '@/types/components';

/**
 * Base props specific to the {@link Image} component.
 */
type ImageBaseProps = BaseComponent &
	Omit<NextImageProps, 'className' | 'style'> & {
		/**
		 * When true, delegates rendering to its direct child via Radix UI Slot,
		 * merging props, ref, and event handlers onto that child.
		 * @default false
		 */
		asChild?: boolean;

		/**
		 * Additional CSS class name to apply to the image element.
		 */
		className?: string;

		/**
		 * Inline CSS properties.
		 */
		style?: CSSProperties;
	};

/**
 * Polymorphic props for the {@link Image} component.
 * Allows inferring valid HTML/Component attributes based on the 'as' prop
 * while preserving Next.js Image optimization properties.
 */
export type ImageProps<E extends ElementType = typeof NextImage> = ImageBaseProps & {
	/**
	 * The HTML element or React component to render as the root node.
	 * Ignored when {@link ImageProps.asChild | asChild} is true.
	 * @default NextImage
	 */
	as?: E;
} & Omit<ComponentPropsWithRef<E>, keyof ImageBaseProps | 'as'>;

/**
 * Low-level image primitive component.
 * Wraps Next.js `Image` with full polymorphism (`as` / `asChild`), tracks image load
 * and error lifecycle states via DOM `data-*` attributes, and supports theme switching.
 *
 * @param props - Component configuration conforming to {@link ImageProps}.
 * @returns The rendered image element or slotted node.
 */
export const Image = <E extends ElementType = typeof NextImage>(props: ImageProps<E>): JSX.Element => {
	const { as, asChild = false, dark, className, ref, src, alt, onLoad, onError, ...rest } = props;

	const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
	const imageRef = useObjectRef(ref as Ref<HTMLImageElement>);

	const Comp = (asChild ? Slot : as || NextImage) as ElementType;

	return (
		<Comp
			{...rest}
			ref={imageRef}
			src={src}
			alt={alt}
			data-primitive='image'
			data-status={status}
			data-loading={status === 'loading' || undefined}
			data-loaded={status === 'loaded' || undefined}
			data-error={status === 'error' || undefined}
			onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
				setStatus('loaded');
				onLoad?.(event);
			}}
			onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
				setStatus('error');
				onError?.(event);
			}}
			className={handleTheme(dark, className)}
		/>
	);
};
