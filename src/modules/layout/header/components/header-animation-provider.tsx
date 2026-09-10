/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type JSX, type PropsWithChildren, useRef } from 'react';
import { Box } from '@/components/base/box';
import { useBreakpoint } from '@/hooks/use-breakpoint';

/**
 * Animation and pinning provider component for the site's sticky header.
 * Utilizes GSAP ScrollTrigger to pin the `#root-header` element across the full height of the viewport.
 *
 * @param props - Component children wrapped within the animation provider.
 * @returns The rendered animation provider container node.
 */
export const HeaderAnimationProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;
	const { device, isHydrated } = useBreakpoint();
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const header = '[data-animate="header"]';

			if (!isHydrated || device !== 'desktop') {
				gsap.set(header, { clearProps: 'all' });
				return;
			}

			ScrollTrigger.create({
				trigger: containerRef.current,
				endTrigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				pin: header,
				pinSpacing: false,
				invalidateOnRefresh: true,
			});
		},
		{ scope: containerRef, dependencies: [device, isHydrated], revertOnUpdate: true },
	);

	return (
		<Box as='div' ref={containerRef} data-header='animation-provider' className='sticky top-0 z-9999 w-full'>
			{children}
		</Box>
	);
};
