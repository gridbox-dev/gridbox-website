/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { type JSX, type PropsWithChildren, useRef } from 'react';
import { Box } from '@/components/base/box';

/**
 * Properties for the {@link NavMenuAnimationProvider} component.
 */
export interface NavMenuAnimationProviderProps extends PropsWithChildren {
	/**
	 * Active item identifier used as a trigger dependency to re-run entrance animations
	 * when switching tabs within the navigation overlay.
	 */
	openedItem?: string;
}

/**
 * GSAP animation provider wrapping dropdown menu content.
 * Executes accelerated entrance animations with micro-staggering across slide targets.
 *
 * @param props - Component configuration options defined by {@link NavMenuAnimationProviderProps}.
 * @returns The animated wrapper container element.
 */
export const NavMenuAnimationProvider = (props: NavMenuAnimationProviderProps): JSX.Element => {
	const { children, openedItem } = props;
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const slides = gsap.utils.toArray<HTMLElement>('[data-animate="slide"]');

			if (slides.length === 0) return;

			gsap.fromTo(
				slides,
				{
					opacity: 0,
					y: -10,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.28,
					stagger: 0.03,
					ease: 'power3.out',
					force3D: true,
					onComplete: () => {
						gsap.set(slides, { clearProps: 'transform,opacity' });
					},
				},
			);
		},
		{ scope: containerRef, dependencies: [openedItem, children] },
	);

	return (
		<Box as='div' ref={containerRef} data-menu='animation-provider' className='contents'>
			{children}
		</Box>
	);
};
