/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Custom hook to safely delegate global anchor click events for in-page smooth navigation.
 * Integrates seamlessly with GSAP ScrollSmoother on desktop and provides native smooth scroll fallback on mobile.
 */
export const useLinkScroll = (): void => {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const handleAnchorClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement | null;
			const anchor = target?.closest('a');
			if (!anchor) return;

			const href = anchor.getAttribute('href');
			if (!href) return;

			if (anchor.target === '_blank' || href.startsWith('http')) return;

			const hashIndex = href.indexOf('#');
			if (hashIndex === -1) return;

			const linkPath = href.substring(0, hashIndex);
			const targetId = href.substring(hashIndex + 1);

			const isCurrentPage = !linkPath || linkPath === pathname || linkPath === '';
			if (!(isCurrentPage && targetId)) return;

			const targetElement = document.getElementById(targetId);
			if (!targetElement) return;

			e.preventDefault();
			e.stopPropagation();

			const smoother = ScrollSmoother.get();

			if (smoother) {
				window.history.pushState(null, '', `#${targetId}`);
				const targetPosition = smoother.offset(targetElement, 'top top');

				gsap.to(smoother, {
					scrollTop: targetPosition,
					duration: 1.2,
					ease: 'power3.inOut',
					overwrite: 'auto',
				});
			} else {
				targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
				router.push(`#${targetId}`, { scroll: false });
			}
		};

		document.addEventListener('click', handleAnchorClick, { capture: true });

		return () => {
			document.removeEventListener('click', handleAnchorClick, { capture: true });
		};
	}, [pathname, router]);
};
