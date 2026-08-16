/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { createEnv } from './env-creation';
import { clientEnvDefinition, serverEnvDefinition } from './env-definition';
import { clientEnvSchema, serverEnvSchema } from './env-schema';

/**
 * Validated server-side environment variables.
 */
const serverEnv = createEnv(serverEnvSchema, serverEnvDefinition);

/**
 * Validated client-side environment variables.
 */
const clientEnv = createEnv(clientEnvSchema, clientEnvDefinition);

export const env = Object.freeze({ ...serverEnv, ...clientEnv });
