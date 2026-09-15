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
import { useNavbarStore } from '@/stores/navbar-store';
import { usePopupStore } from '@/stores/popup-store';

/**
 * Headless motion provider for the header dropdown menu element.
 * Manages dual-directional GSAP entrance (fade-in & slide-down) and exit (fade-out & slide-up) animations
 * synchronized with active megamenu and popup states without adding extra wrapper nodes.
 *
 * @param props - Children nodes to apply entry and exit animations to defined by {@link PropsWithChildren}.
 * @returns The slot-composed child element attached to the GSAP animation reference.
 */
export const MotionProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;
	const containerRef = useRef<HTMLElement>(null);

	const openedItem = useNavbarStore((s) => s.openedItem);
	const openedPopup = usePopupStore((s) => s.openedPopup);

	const isDropdownOpen = Boolean(openedPopup === 'header-nav-dropdown' && openedItem);

	useGSAP(
		() => {
			const menu = containerRef.current;
			if (!menu) return;

			if (isDropdownOpen) {
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
			} else {
				gsap.to(menu, {
					opacity: 0,
					y: -10,
					duration: 0.28,
					ease: 'power3.in',
					force3D: true,
				});
			}
		},
		{ scope: containerRef, dependencies: [isDropdownOpen], revertOnUpdate: true },
	);

	return <Slot ref={containerRef}>{children}</Slot>;
};
