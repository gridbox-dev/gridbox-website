/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import process from 'node:process';

/**
 * Reads raw process variables intended strictly for server execution.
 */
export const serverEnvDefinition = {
	nodeEnv: process.env.NODE_ENV,
	isProduction: process.env.NODE_ENV === 'production',
};

/**
 * Reads raw process variables exposed to the browser via the NEXT_PUBLIC prefix.
 */
export const clientEnvDefinition = {
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
};
