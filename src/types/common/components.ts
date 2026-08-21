/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

/**
 * Assigns unique identifiers to components.
 */
export interface HandledComponent {
	componentLayer?: string;
	componentId?: string;
}

/**
 * Style typed variables for light and dark modes.
 */
export type Theme = 'dark' | 'light';
