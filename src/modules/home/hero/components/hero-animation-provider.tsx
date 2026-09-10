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
import { useBreakpoint } from '@/hooks/use-breakpoint';

/**
 * Client-side animation provider coordinating entry sequences and ScrollTrigger pinning effects.
 * Manages separate animation timelines for the pinned hero header, action CTAs, and dashboard mockup.
 *
 * @param props - Component options containing child React nodes.
 * @returns Rendered container node wrapping children inside the GSAP animation scope.
 */
export const HeroAnimationProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;
	const { breakpoint } = useBreakpoint();
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const header = '[data-animate="hero-header"]';
			const fade = gsap.utils.toArray('[data-animate="fade"]');

			gsap.fromTo(fade, { opacity: 0 }, { opacity: 1, stagger: 0.06, ease: 'power3.inOut', duration: 0.6 });

			gsap.to(header, {
				opacity: 0,
				y: -20,
				scale: 0.98,
				ease: 'power2.out',
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top 64px',
					end: 'center top',
					scrub: true,
					pin: header,
					pinSpacing: false,
				},
			});
		},
		{ scope: containerRef, dependencies: [breakpoint] },
	);

	return (
		<Box as='div' ref={containerRef} data-hero='animation-provider' className='relative w-full'>
			{children}
		</Box>
	);
};
