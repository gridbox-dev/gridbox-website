/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { BarPiece } from '../components/charts/bar-chart/chart-bar-item';

/**
 * Represents the dataset transition states for a single bar chart column item.
 */
export interface ChartSeriesItem {
	/**
	 * Initial metrics distribution before transition or loop sequence.
	 */
	initial: BarPiece;

	/**
	 * Target metrics distribution after transition or loop sequence.
	 */
	final: BarPiece;
}

/**
 * Mock data series containing 12-month initial and final metric percentage values
 * used for animating the dashboard ROI bar chart widget.
 */
export const MOCK_CHART_SERIES: Array<ChartSeriesItem> = [
	{ initial: { neutral: 85, primary: 60, secondary: 30 }, final: { neutral: 95, primary: 75, secondary: 45 } },
	{ initial: { neutral: 70, primary: 45, secondary: 20 }, final: { neutral: 82, primary: 58, secondary: 32 } },
	{ initial: { neutral: 90, primary: 75, secondary: 40 }, final: { neutral: 95, primary: 88, secondary: 56 } },
	{ initial: { neutral: 65, primary: 40, secondary: 15 }, final: { neutral: 88, primary: 62, secondary: 35 } },
	{ initial: { neutral: 80, primary: 55, secondary: 25 }, final: { neutral: 92, primary: 70, secondary: 42 } },
	{ initial: { neutral: 95, primary: 70, secondary: 35 }, final: { neutral: 96, primary: 78, secondary: 56 } },
	{ initial: { neutral: 75, primary: 50, secondary: 20 }, final: { neutral: 89, primary: 64, secondary: 36 } },
	{ initial: { neutral: 88, primary: 65, secondary: 30 }, final: { neutral: 96, primary: 78, secondary: 48 } },
	{ initial: { neutral: 60, primary: 35, secondary: 15 }, final: { neutral: 84, primary: 56, secondary: 28 } },
	{ initial: { neutral: 82, primary: 58, secondary: 28 }, final: { neutral: 90, primary: 72, secondary: 40 } },
	{ initial: { neutral: 92, primary: 68, secondary: 38 }, final: { neutral: 76, primary: 48, secondary: 24 } },
	{ initial: { neutral: 100, primary: 80, secondary: 50 }, final: { neutral: 98, primary: 85, secondary: 60 } },
];
