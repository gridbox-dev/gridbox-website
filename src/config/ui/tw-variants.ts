/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { type TWMergeConfig, tv as tvBase } from 'tailwind-variants';

/**
 * Global configuration options for tailwing-merge resolution within tailwind-variants.
 * Extend this object to define custom class groups, conflict rules or prefixes.
 */
const twMergeConfig: TWMergeConfig = {};

/**
 * Customized tailwind-variants wrapper function that enforces automatic class merging.
 * Preserves the full static type signatures, variant inference and autocomplete capabilities from tv.
 * @param options - Variant definitions, base styles and default props.
 * @param config - Optional runtime configuration extending or overriding global twMerge behavior.
 * @returns A styled component builder function capable of evaluating variants and resolving CSS conflicts.
 */
export const tv: typeof tvBase = (options, config) => {
	return tvBase(options, {
		...config,
		twMerge: true,
		twMergeConfig,
	});
};
