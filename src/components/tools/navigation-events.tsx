/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useHeaderNavStore } from '@/modules/layout/header/stores/header-nav-store';
import { usePopupStore } from '@/stores/popup-store';

/**
 * Client-side global route change listener.
 * Automatically closes all open dropdowns, mobile drawers, and active popups when navigating.
 */
export const NavigationEvents = (): null => {
	const pathname = usePathname();
	const previousPathname = useRef<string>(pathname);

	const resetPopup = usePopupStore((s) => s.toggle);
	const resetNav = useHeaderNavStore((s) => s.toggle);

	useEffect(() => {
		if (previousPathname.current !== pathname) {
			previousPathname.current = pathname;

			resetPopup(undefined);
			resetNav(undefined);
		}
	}, [pathname, resetNav, resetPopup]);

	return null;
};
