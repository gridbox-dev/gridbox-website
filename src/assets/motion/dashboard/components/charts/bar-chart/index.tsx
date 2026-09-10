/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { ChartBarItem } from './chart-bar-item';
import { ChartYAxis } from './chart-y-axis';

const styles = tv({
	slots: {
		base: 'relative flex flex-col h-full w-full pb-16',
		data: 'absolute inset-0 flex items-end justify-between pl-72 pr-32',
	},
});

/**
 * Properties for the {@link BarChart} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type BarChartProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Base layout container for rendering animated bar charts.
 * Coordinates background vertical axis scale markers with dynamically positioned child bar columns.
 *
 * @param props - The component props defined by {@link BarChartProps}.
 * @returns The rendered bar chart base element node.
 */
const BarChartBase = (props: BarChartProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base, data } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='bar-chart' className={base({ className })}>
			<ChartYAxis />

			<Box as='div' data-dashboard='bar-chart-data' className={data()}>
				{children}
			</Box>
		</Box>
	);
};

/**
 * Compound component for constructing interactive bar chart visualizations.
 * Combines the base chart container with the `Item` subcomponent for individual bar columns.
 */
export const BarChart = Object.assign(BarChartBase, {
	Item: ChartBarItem,
});
