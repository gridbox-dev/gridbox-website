/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		container: 'relative flex flex-col items-center justify-end w-full max-w-280 aspect-2/1 overflow-hidden',
		svg: 'w-full h-auto overflow-visible',
		track: 'stroke-bg-tertiary fill-none',
		indicator: 'stroke-utility-brand-400 fill-none transition-[stroke-dashoffset] duration-700 ease-out',
		valueWrapper: 'absolute bottom-0 flex flex-col items-center justify-end leading-none pb-4',
		valueText: 'text-heading-24 font-bold text-primary tracking-tight',
		labelText: 'text-copy-12 text-tertiary mt-2',
	},
});

/**
 * Properties for the {@link DonutChartGauge} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export interface DonutChartGaugeProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
	/**
	 * Numeric percentage progress value displayed by the gauge.
	 * @default 0
	 */
	value?: number;

	/**
	 * Optional descriptive label displayed under the value node.
	 */
	label?: string;
}

const RADIUS = 38;
const FULL_CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const HALF_CIRCUMFERENCE = Math.PI * RADIUS;

/**
 * Visual semi-donut gauge component.
 * Renders the animated progress arc and the central percentage and label counter.
 *
 * @param props - Component options defined by {@link DonutChartGaugeProps}.
 * @returns The rendered gauge graphic node.
 */
export const DonutChartGauge = (props: DonutChartGaugeProps): JSX.Element => {
	const { value = 0, label, className, ...rest } = props;
	const { container, svg, track, indicator, valueWrapper, valueText, labelText } = styles();

	const targetPercentage = Math.min(100, Math.max(0, value));
	const filledArcLength = (targetPercentage / 100) * HALF_CIRCUMFERENCE;

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-dashboard='pie-chart-progress-circle'
			className={container({ className })}
		>
			<svg viewBox='0 0 100 55' className={svg()}>
				<title>Semi-donut chart</title>

				<circle
					cx='50'
					cy='50'
					r={RADIUS}
					strokeWidth='10'
					strokeDasharray={`${HALF_CIRCUMFERENCE} ${FULL_CIRCUMFERENCE}`}
					strokeDashoffset='0'
					strokeLinecap='round'
					transform='rotate(-180 50 50)'
					className={track()}
				/>

				<circle
					cx='50'
					cy='50'
					r={RADIUS}
					strokeWidth='10'
					strokeDasharray={`${HALF_CIRCUMFERENCE} ${FULL_CIRCUMFERENCE}`}
					strokeDashoffset={HALF_CIRCUMFERENCE - filledArcLength}
					strokeLinecap='round'
					transform='rotate(-180 50 50)'
					className={indicator()}
				/>
			</svg>

			<Box as='div' data-dashboard='pie-chart-value' className={valueWrapper()}>
				<Box as='span' className={valueText()}>
					{value}%
				</Box>
				{label && (
					<Box as='span' className={labelText()}>
						{label}
					</Box>
				)}
			</Box>
		</Box>
	);
};
