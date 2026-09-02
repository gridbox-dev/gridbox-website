/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import kx from 'klsx';

/**
 * Handles class merging for theme selection.
 * Appends 'dark-mode' utility class when dark is true.
 * @param dark - Flag indicating if dark theme should be applied.
 * @param className - Optional existing CSS classes.
 * @returns Combined class string or undefined if empty.
 */
export const handleTheme = (dark?: boolean, className?: string): string | undefined => {
	const result = dark ? kx(className, 'dark-mode') : className;
	return result || undefined;
};
