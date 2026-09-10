/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { BarChart } from '@/assets/icons/bar-chart';
import { CheckDone } from '@/assets/icons/check-done';
import { Home } from '@/assets/icons/home';
import { PieChart } from '@/assets/icons/pie-chart';
import { Rows } from '@/assets/icons/rows';
import { Users } from '@/assets/icons/users';
import type { ComponentIcon } from '@/types/components';

export interface SidebarIcon {
	key: string;
	icon: ComponentIcon;
	active?: boolean;
}

export const SIDEBAR_ICONS_MAP: Array<SidebarIcon> = [
	{
		key: 'home',
		icon: Home,
	},
	{
		key: 'bar-chart',
		icon: BarChart,
		active: true,
	},
	{
		key: 'rows',
		icon: Rows,
	},
	{
		key: 'check-done',
		icon: CheckDone,
	},
	{
		key: 'pie-chart',
		icon: PieChart,
	},
	{
		key: 'users',
		icon: Users,
	},
];
