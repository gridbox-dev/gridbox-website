/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { type RefObject, useRef } from 'react';

/**
 * Custom hook to trigger entrance animations for elements marked with `data-animate` attributes.
 * Utilizes `@gsap/react` with a scoped container reference to prevent global selector leaks.
 *
 * @returns Ref container to attach to the top-level animated dashboard node.
 */
export const useDashboardAnimate = (): { containerRef: RefObject<HTMLDivElement | null> } => {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const targets = gsap.utils.toArray('[data-animate]');

			if (!targets.length) return;

			gsap.fromTo(
				targets,
				{
					opacity: 0,
					y: 10,
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.08,
					ease: 'power3.inOut',
					clearProps: 'transform,opacity',
				},
			);
		},
		{ scope: containerRef },
	);

	return { containerRef };
};
