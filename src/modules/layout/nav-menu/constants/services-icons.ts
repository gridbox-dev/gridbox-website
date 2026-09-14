/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Asterisk } from '@/assets/icons/asterisk';
import { BankNote } from '@/assets/icons/bank-note';
import { Brush } from '@/assets/icons/brush';
import { CodeSnippet } from '@/assets/icons/code-snippet';
import { Columns } from '@/assets/icons/columns';
import { Compass } from '@/assets/icons/compass';
import { Dataflow } from '@/assets/icons/dataflow';
import { Dataflow02 } from '@/assets/icons/dataflow-02';
import { FileSearch } from '@/assets/icons/file-search';
import { Laptop } from '@/assets/icons/laptop';
import { Rocket } from '@/assets/icons/rocket';
import { Route } from '@/assets/icons/route';
import { Server } from '@/assets/icons/server';
import { ShoppingCart } from '@/assets/icons/shopping-cart';
import { Users } from '@/assets/icons/users';
import type { ComponentIcon } from '@/types/components';

/**
 * Keyed dictionary mapping service keys to their corresponding icon components.
 */
export const SERVICES_ICONS_MAP = {
	'custom-software': CodeSnippet,
	'system-integration': Dataflow,
	website: Laptop,
	'legacy-modernization': Rocket,
	infrastructure: Server,
	'ux-design': Brush,
	'ecommerce-b2b': BankNote,
	'ecommerce-b2c': ShoppingCart,
	'erp-integration': Dataflow02,
	'software-architecture': Compass,
	'cto-as-service': Asterisk,
	'project-management': Columns,
	'it-consulting': Route,
	discovery: FileSearch,
	'talent-selection': Users,
} satisfies Record<string, ComponentIcon | undefined>;

/**
 * Valid string keys representing supported service icon identifiers in {@link SERVICES_ICONS_MAP}.
 */
export type ServiceIconKey = keyof typeof SERVICES_ICONS_MAP;
