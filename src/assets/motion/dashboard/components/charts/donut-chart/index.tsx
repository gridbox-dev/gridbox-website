/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { Children, cloneElement, isValidElement, type JSX, type ReactElement } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { DonutChartGauge, type DonutChartGaugeProps } from './chart-gauge';

const styles = tv({
	base: 'flex flex-col items-center justify-between size-full p-16 gap-32',
});

/**
 * Properties for the {@link DonutChart} component.
 * Extends base `div` element props while omitting unused primitive props (`as`, `asChild`).
 */
export interface DonutChartProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
	/**
	 * Numeric percentage dataset containing initial and final transition states.
	 */
	data?: {
		/**
		 * Starting percentage metric value before transition.
		 * @default 48
		 */
		initial?: number;

		/**
		 * Target percentage metric value after transition.
		 * @default 96
		 */
		final?: number;
	};

	/**
	 * Synchronized transition state flag provided by `useChartSync`.
	 * Toggles the gauge readout between `initial` and `final` metric values.
	 * @default false
	 */
	isFinalState?: boolean;
}

/**
 * Base semi-donut chart component wrapper.
 * Computes metric transitions based on synchronized state flags and injects values into gauge children.
 *
 * @param props - Component options defined by {@link DonutChartProps}.
 * @returns Rendered semi-donut chart node.
 */
const DonutChartBase = (props: DonutChartProps): JSX.Element => {
	const { data = { initial: 48, final: 96 }, isFinalState = false, children, className, ...rest } = props;

	const currentValue = isFinalState ? data.initial : data.final;

	const formattedChildren = Children.map(children, (child) => {
		if (!isValidElement(child)) return child;

		if (child.type === DonutChartGauge) {
			const childProps = child.props as DonutChartGaugeProps;
			return cloneElement(child as ReactElement<DonutChartGaugeProps>, {
				...childProps,
				value: currentValue,
			});
		}

		return child;
	});

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='pie-chart' className={styles({ className })}>
			{formattedChildren}
		</Box>
	);
};

/**
 * Compound component for rendering interactive semi-donut charts.
 * Automatically injects animated transition states into its `Gauge` subcomponent without Context API.
 */
export const DonutChart = Object.assign(DonutChartBase, {
	Gauge: DonutChartGauge,
});
