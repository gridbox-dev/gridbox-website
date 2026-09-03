/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

/**
 * Filters and extracts all ARIA attributes from a given properties object.
 * Useful for forwarding accessibility attributes to underlying HTML elements
 * while stripping unneeded component props.
 *
 * @template T - Object type extending a generic record of unknown key-value pairs.
 * @param props - Source properties object to evaluate for ARIA key prefixes.
 * @returns A new key-value dictionary containing exclusively extracted ARIA attributes.
 */
export const extractAriaProps = <T extends Record<string, unknown>>(props: T): Record<string, unknown> => {
	return Object.keys(props)
		.filter((key) => key.startsWith('aria-'))
		.reduce<Record<string, unknown>>((acc, key) => {
			acc[key] = props[key];
			return acc;
		}, {});
};
