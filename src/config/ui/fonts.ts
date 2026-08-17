/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Geist, Lora } from 'next/font/google';

/**
 * Primary sans-serif variable font configuration.
 */
export const fontSans = Geist({
	variable: '--font-sans',
	display: 'swap',
	subsets: ['latin'],
});

/**
 * Secondary serif variable font configuration.
 */
export const fontSerif = Lora({
	variable: '--font-serif',
	display: 'swap',
	subsets: ['latin'],
});
