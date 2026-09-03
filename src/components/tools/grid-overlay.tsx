/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { type JSX, useEffect, useState } from 'react';
import { Box } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { useBreakpoint } from '@/hooks/use-breakpoint';
import type { Breakpoint } from '@/types/layout';

const styles = tv({
	slots: {
		base: 'fixed left-1/2 -translate-x-1/2 z-10000 h-svh w-full max-w-container pointer-events-none select-none',
		inner: 'relative flex justify-between shrink-0 size-full',
		margin: 'h-full w-16 shrink-0 bg-utility-red-600/20 tablet:w-32',
		grid: 'flex justify-between gap-16 size-full tablet:gap-24',
		column: 'size-full bg-utility-red-600/10',
	},
});

/**
 * Maps active breakpoint token to total layout column count.
 */
const getColumnCount = (breakpoint: Breakpoint): number => {
	switch (breakpoint) {
		case 'mobile':
			return 4;

		case 'tablet':
			return 6;

		case 'laptop':
		case 'desktop':
			return 12;
	}
};

/**
 * Visual design system overlay that renders responsive grid alignment columns.
 * Can be toggled globally via `Cmd + Shift + G` / `Ctrl + Shift + G`.
 *
 * @returns The rendered grid overlay node or null if hidden.
 */
export const GridOverlay = (): JSX.Element | null => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { breakpoint, isHydrated } = useBreakpoint();

	const { base, inner, margin, grid, column } = styles();
	const columnCount = getColumnCount(breakpoint);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			const target = event.target as HTMLElement | null;

			const isEditingText =
				target?.isContentEditable ||
				target?.tagName === 'INPUT' ||
				target?.tagName === 'TEXTAREA' ||
				target?.tagName === 'SELECT';

			if (isEditingText) return;

			if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'g') {
				event.preventDefault();
				setIsVisible((prev) => !prev);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	if (!(isVisible && isHydrated)) return null;

	return (
		<Box as='div' aria-hidden='true' data-layout='grid-overlay' data-overlay='container-outer' className={base()}>
			<Box as='div' data-overlay='container-inner' className={inner()}>
				<Box as='div' data-overlay='margin' className={margin()} />
				<Box as='div' data-overlay='grid' className={grid()}>
					{Array.from({ length: columnCount }, (_, i) => i + 1).map((colNumber) => (
						<Box key={`grid-col-${breakpoint}-${colNumber}`} as='div' data-overlay='column' className={column()} />
					))}
				</Box>
				<Box as='div' data-overlay='margin' className={margin()} />
			</Box>
		</Box>
	);
};
