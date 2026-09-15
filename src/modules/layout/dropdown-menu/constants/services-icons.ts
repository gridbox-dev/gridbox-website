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
import { Laptop } from '@/assets/icons/laptop';
import { Rocket } from '@/assets/icons/rocket';
import { Route } from '@/assets/icons/route';
import { Search } from '@/assets/icons/search';
import { Server } from '@/assets/icons/server';
import { ShoppingCart } from '@/assets/icons/shopping-cart';
import { Users } from '@/assets/icons/users';
import type { ServiceAppRouteKey } from '@/config/constants/app-routes';
import type { ComponentIcon } from '@/types/components';

export const SERVICES_ICONS_MAP: Record<ServiceAppRouteKey, ComponentIcon> = {
	customSoftware: CodeSnippet,
	systemIntegration: Dataflow,
	websites: Laptop,
	legacyModernization: Rocket,
	infrastructure: Server,
	design: Brush,
	eCommerceB2B: BankNote,
	eCommerceB2C: ShoppingCart,
	erpIntegration: Dataflow02,
	architecture: Compass,
	cto: Asterisk,
	projectManagement: Columns,
	itConsulting: Route,
	discovery: Search,
	talentSelection: Users,
} as const;
