/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { Divider } from '@/components/ui/divider';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'relative z-0 flex flex-col items-center justify-between size-full',
		group: 'flex items-center gap-4 h-20 w-full',
		number: 'w-40 text-copy-12 text-tertiary',
		divider: 'shrink',
	},
});

/**
 * Properties for the {@link ChartYAxis} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type ChartYAxisProps = Omit<BoxProps<'div'>, 'as' | 'asChild' | 'children'>;

/**
 * Fixed percentage values rendered sequentially down the vertical chart grid axis.
 */
const AXIS_NUMBERS: Array<number> = [100, 80, 60, 40, 20, 0];

/**
 * Vertical background grid axis component for chart widgets.
 * Renders percentage labels alongside horizontal divider lines to establish visual scale references.
 *
 * @param props - The component props defined by {@link ChartYAxisProps}.
 * @returns The rendered vertical axis background grid node.
 */
export const ChartYAxis = (props: ChartYAxisProps): JSX.Element => {
	const { className, ...rest } = props;
	const { base, group, number, divider } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='chart-y-axis' className={base({ className })}>
			{AXIS_NUMBERS.map((num) => (
				<Box key={`y-axis-${num}`} as='div' data-dashboard='y-axis-group' className={group()}>
					<Box as='span' className={number()}>
						{num}%
					</Box>

					<Divider color='tertiary' className={divider()} />
				</Box>
			))}
		</Box>
	);
};
