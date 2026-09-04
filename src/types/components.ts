/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { FC, ReactNode } from 'react';

/**
 * Required and shared properties in the base components.
 */
export interface BaseComponent {
	/**
	 * Theme context modifier for the component.
	 * When set to dark, appends the dark-mode utility class to the node.
	 * @default false
	 */
	dark?: boolean;
}

/**
 * Component function or rendered node to display inside some components.
 */
export type ComponentIcon = FC<{ className?: string }> | ReactNode;
