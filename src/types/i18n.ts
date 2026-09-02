/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

/**
 * Languages supported for the website's internationalization.
 * @default 'es'
 */
export type Language = 'es' | 'en';

/**
 * Parameters required in the cookie that stores the user's language preference.
 */
export interface LocaleCookie {
	/**
	 * Name of the cookie.
	 */
	name: string;
	/**
	 * Duration of the cookie.
	 */
	maxAge: number;
}
