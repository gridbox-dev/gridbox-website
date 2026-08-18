/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { type JSX, useEffect, useState } from 'react';
import { env } from '@/config/env';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		container:
			'fixed z-10000 left-1/2 -translate-x-1/2 h-svh w-full max-w-container pointer-events-none select-none',
		inner: 'relative flex h-full w-full',
		margin: 'absolute z-1000 h-full w-16 bg-utility-red-600/20 tablet:w-32',
		grid: 'grid grid-cols-4 grid-rows-1 gap-16 h-full w-full mx-16 tablet:grid-cols-6 tablet:gap-24 tablet:mx-32 laptop:grid-cols-12',
		column:
			'hidden h-full w-full bg-utility-red-600/10 nth-[-n+4]:block tablet:nth-[-n+6]:block laptop:block',
	},

	variants: {
		position: {
			left: {
				margin: 'left-0',
			},
			right: {
				margin: 'right-0',
			},
		},
	},
});

/**
 * Static array of unique identifiers for grid column slots.
 * Prevents array-index-key linter warnings by providing immutable keys.
 */
const COLUMN_KEYS = Array.from({ length: 12 }, (_, index) => `col-slot-${index + 1}`);

/**
 * Renders an accessible layout grid overlay matching Figma design
 * specs across mobile, tablet and desktop viewports.
 * Press Ctrl/Cmd + Shift + G to toggle visibility.
 * @returns The non-interactive grid overlay element or null when hidden.
 */
function GridOverlay(): JSX.Element | null {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { container, inner, margin, grid, column } = styles();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			const target = event.target as HTMLElement | null;

			const isEditingText =
				target?.isContentEditable ||
				target?.tagName === 'INPUT' ||
				target?.tagName === 'TEXTAREA' ||
				target?.tagName === 'SELECT';

			if (isEditingText) return;

			if (
				(event.ctrlKey || event.metaKey) &&
				event.shiftKey &&
				event.key.toLowerCase() === 'g'
			) {
				event.preventDefault();
				setIsVisible((prev) => !prev);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	if (!isVisible || env.isProduction) return null;

	return (
		<div id='grid-overlay' aria-hidden='true' data-overlay='container' className={container()}>
			<div data-overlay='inner' className={inner()}>
				<div data-overlay='margin' className={margin({ position: 'left' })} />

				<div data-overlay='grid' className={grid()}>
					{COLUMN_KEYS.map((key) => (
						<div key={key} data-overlay='column' className={column()} />
					))}
				</div>
				<div data-overlay='margin' className={margin({ position: 'right' })} />
			</div>
		</div>
	);
}

export default GridOverlay;
