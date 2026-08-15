/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const nextDirectory = join(cwd(), '.next');

if (existsSync(nextDirectory)) {
	rmSync(nextDirectory, { recursive: true, force: true });
}
