/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Bema } from '@/assets/logos/bema';
import { Fematco } from '@/assets/logos/fematco';
import { Reform } from '@/assets/logos/reform';
import { SmartCoffee } from '@/assets/logos/smartcoffee';
import { TrioConsultores } from '@/assets/logos/trio-consultores';
import { UniversidadPalermo } from '@/assets/logos/universidad-palermo';
import type { ComponentIcon } from '@/types/components';

/**
 * Configuration structure for individual client logo icons.
 */
export interface ClientLogoConfig {
	/**
	 * React SVG icon component associated with the client brand.
	 */
	logo: ComponentIcon;

	/**
	 * Optional custom utility class overrides for logo sizing/scaling.
	 */
	className?: string;
}

/**
 * Key-value mapping linking dictionary keys to their respective SVG logo components.
 */
export const CLIENTS_LOGOS_MAP: Record<string, ClientLogoConfig> = {
	upalermo: {
		logo: UniversidadPalermo,
		className: 'h-20',
	},
	fematco: {
		logo: Fematco,
		className: 'h-20',
	},
	smartcoffee: {
		logo: SmartCoffee,
		className: 'h-12 laptop:h-14',
	},
	'trio-consultores': {
		logo: TrioConsultores,
		className: 'h-32',
	},
	bema: {
		logo: Bema,
		className: 'h-24',
	},
	reform: {
		logo: Reform,
		className: 'h-20',
	},
};
