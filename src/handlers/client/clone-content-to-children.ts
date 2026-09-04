/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

/**
 * Higher-order utility function for element children manipulation and cloning.
 * When `asChild` is `true` and `children` is a valid React element, it clones the child element
 * and applies the provided `content` transformation callback directly to the child's nested children.
 * Otherwise, it applies the transformation directly to the root `children` node.
 *
 * @param children - The React node or valid React element to manipulate.
 * @param content - Transformation callback function receiving the existing node and returning the modified structure.
 * @param asChild - Flag indicating whether prop delegation via Radix `Slot` is enabled.
 * @returns The transformed React element or modified children tree.
 */
export const cloneContentToChildren = (
	children: ReactNode,
	content: (node: ReactNode) => ReactNode,
	asChild?: boolean,
) => {
	if (asChild && isValidElement(children)) {
		const child = children as ReactElement<{ children?: ReactNode }>;

		return cloneElement(child, {
			children: content(child.props.children),
		});
	}

	return content(children);
};
