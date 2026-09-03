/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

// biome-ignore-all lint/suspicious/noExplicitAny: Component guards require explicit any for runtime introspection.

import type React from 'react';

/**
 * Union type representing standard React functional or class component structures.
 */
type ReactComponent = React.FC<any> | React.ComponentClass<any, any>;

/**
 * Type guard that checks if a value is a React Functional Component (FC).
 * @param component - The value to evaluate.
 * @returns `true` if the component is a JavaScript function, `false` otherwise.
 */
export const isFunctionComponent = (component: any): component is React.FC<any> => {
	return typeof component === 'function';
};

/**
 * Type guard that checks if a value is a React Class Component.
 * Verifies that the input is a constructor function containing `isReactComponent` or `render` properties on its prototype.
 * @param component - The value to evaluate.
 * @returns `true` if the value matches a React Class Component structure, `false` otherwise.
 */
export const isClassComponent = (component: any): component is React.ComponentClass<any, any> => {
	return Boolean(
		typeof component === 'function' &&
			component.prototype &&
			(component.prototype.isReactComponent || component.prototype.render),
	);
};

/**
 * Type guard that checks if a value is a React component wrapped in `React.forwardRef`.
 * Inspects the internal `$$typeof` property to match the `Symbol(react.forward_ref)` identifier.
 * @param component - The value to evaluate.
 * @returns `true` if the value is a forwardRef exotic component, `false` otherwise.
 */
export const isForwardRefComponent = (component: any): component is React.ForwardRefExoticComponent<any> => {
	return (
		typeof component === 'object' &&
		component !== null &&
		Boolean(component.$$typeof) &&
		component.$$typeof.toString() === 'Symbol(react.forward_ref)'
	);
};

/**
 * General type guard that checks if a value is any valid React component type.
 * @param component - The value to evaluate.
 * @returns `true` if the input is a valid React component structure, `false` otherwise.
 */
export const isReactComponent = (component: any): component is ReactComponent => {
	return isFunctionComponent(component) || isForwardRefComponent(component) || isClassComponent(component);
};
