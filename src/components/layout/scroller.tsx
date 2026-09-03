/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type JSX, useRef } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { useLinkScroll } from '@/hooks/use-link-scroll';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

/**
 * Props for the {@link Scroller} component.
 * Extends {@link BoxProps} for a `div` element, excluding 'as', 'asChild', and 'id'
 * to enforce the fixed GSAP ScrollSmoother DOM hierarchy.
 */
export type ScrollerProps = Omit<BoxProps<'div'>, 'as' | 'asChild' | 'id'>;

/**
 * Higher-level layout component that initializes GSAP ScrollSmoother exclusively for desktop viewports.
 * Enforces the required `wrapper` and `content` DOM hierarchy and handles lifecycle cleanup.
 *
 * @param props - Component options conforming to {@link ScrollerProps}.
 * @returns The rendered GSAP smooth scroll wrapper node.
 */
export const Scroller = (props: ScrollerProps): JSX.Element => {
	const { children, ...rest } = props;
	const { device, isHydrated } = useBreakpoint();

	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);

	useLinkScroll();

	useGSAP(
		() => {
			if (!isHydrated) return;

			let smoother: ScrollSmoother | null = null;

			const wrapper = wrapperRef.current;
			const content = contentRef.current;

			if (device === 'desktop' && wrapper && content) {
				smoother = ScrollSmoother.create({
					wrapper,
					content,
					smooth: 0.8,
					effects: true,
					smoothTouch: false,
				});
			} else if (wrapper && content) {
				gsap.set([wrapper, content], { clearProps: 'all' });
			}

			ScrollTrigger.refresh();

			return () => {
				if (smoother) smoother.kill();
			};
		},
		{ dependencies: [device, isHydrated], scope: wrapperRef, revertOnUpdate: true },
	);

	return (
		<Box {...rest} as='div' ref={wrapperRef} id='smooth-wrapper'>
			<Box as='div' ref={contentRef} id='smooth-content'>
				{children}
			</Box>
		</Box>
	);
};
