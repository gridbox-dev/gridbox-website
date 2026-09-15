/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useGSAP } from '@gsap/react';
import { Slot } from '@radix-ui/react-slot';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type JSX, type PropsWithChildren, useRef } from 'react';
import { useBreakpoint } from '@/hooks/use-breakpoint';

/**
 * Headless motion provider for the website header element.
 * Utilizes Radix UI {@link Slot} to attach GSAP ScrollTrigger pinning behaviors
 * directly to its child element without rendering additional wrapper DOM nodes.
 *
 * @param props - Component children wrapped within the provider.
 * @returns The child React element with merged GSAP references.
 */
export const MotionProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;

	const containerRef = useRef<HTMLElement>(null);
	const { device, isHydrated } = useBreakpoint();

	useGSAP(
		() => {
			const header = containerRef.current;
			if (!header) return;

			if (!isHydrated || device !== 'desktop') {
				gsap.set(header, { clearProps: 'all' });
				return;
			}

			ScrollTrigger.create({
				trigger: header,
				endTrigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				pin: true,
				pinSpacing: false,
				invalidateOnRefresh: true,
			});
		},
		{ scope: containerRef, dependencies: [device, isHydrated], revertOnUpdate: true },
	);

	return <Slot ref={containerRef}>{children}</Slot>;
};
