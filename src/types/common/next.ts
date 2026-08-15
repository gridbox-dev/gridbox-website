/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

/** Declared static params for locale routes. */
export interface StaticParams {
	params: Promise<{
		lang: string;
	}>;
}
