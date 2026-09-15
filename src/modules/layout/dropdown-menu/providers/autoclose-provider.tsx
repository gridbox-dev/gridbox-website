/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Slot } from '@radix-ui/react-slot';
import { type JSX, type PropsWithChildren, useEffect, useRef } from 'react';
import { useNavbarStore } from '@/stores/navbar-store';
import { usePopupStore } from '@/stores/popup-store';

/**
 * Auto-close provider wrapper for the dropdown menu overlay.
 * Monitors global pointer down events to dismiss active megamenu overlays when
 * interactions occur outside both the dropdown overlay and the primary header bar.
 *
 * @param props - Children nodes enclosed within the auto-close boundary defined by {@link PropsWithChildren}.
 * @returns The slot-composed child element attached to the click listener scope reference.
 */
export const AutoCloseProvider = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;

	const containerRef = useRef<HTMLElement>(null);

	const openedItem = useNavbarStore((s) => s.openedItem);
	const openedPopup = usePopupStore((s) => s.openedPopup);

	const toggleItem = useNavbarStore((s) => s.toggle);
	const togglePopup = usePopupStore((s) => s.toggle);

	const isDropdownOpen = Boolean(openedPopup === 'header-nav-dropdown' && openedItem);

	useEffect(() => {
		if (!isDropdownOpen) return;

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target as Node | null;

			const container = containerRef.current;
			const header = document.getElementById('root-header');

			if (!target) return;

			const path = event.composedPath();

			const isInsideDropdown = container ? path.includes(container) || container.contains(target) : false;
			const isInsideHeader = header ? path.includes(header) || header.contains(target) : false;

			if (!(isInsideDropdown || isInsideHeader)) {
				togglePopup(undefined);
				toggleItem(undefined);
			}
		};
		document.addEventListener('pointerdown', handlePointerDown, true);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown, true);
		};
	}, [isDropdownOpen, toggleItem, togglePopup]);

	return <Slot ref={containerRef}>{children}</Slot>;
};
