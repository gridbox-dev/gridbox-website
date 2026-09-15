/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useGSAP } from '@gsap/react';
import { Slot } from '@radix-ui/react-slot';
import gsap from 'gsap';
import { type JSX, type PropsWithChildren, useRef } from 'react';

/**
 * Headless motion provider for the header dropdown menu element.
 * Applies entry entrance animations (fade-in & slide-down) to the underlying child node
 * upon mounting without introducing additional wrapper HTML elements.
 *
 * @param props - Children nodes to apply entry animations to defined by {@link PropsWithChildren}.
 * @returns The slot-composed child element attached to the GSAP animation reference.
 */
export const MotionProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;
	const containerRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const menu = containerRef.current;
			if (!menu) return;

			gsap.fromTo(
				menu,
				{
					opacity: 0,
					y: -10,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.28,
					ease: 'power3.out',
					force3D: true,
					onComplete: () => {
						gsap.set(menu, { clearProps: 'transform,opacity' });
					},
				},
			);
		},
		{ scope: containerRef, revertOnUpdate: true },
	);

	return <Slot ref={containerRef}>{children}</Slot>;
};
