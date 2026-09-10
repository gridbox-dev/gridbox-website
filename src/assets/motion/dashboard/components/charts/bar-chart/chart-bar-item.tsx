/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'relative flex flex-col items-center justify-end gap-10 h-full w-32',
		inner: 'relative flex flex-col items-center justify-end size-full',
		piece: 'absolute bottom-0 inset-x-0 w-full will-change-transform rounded-t-8 transition-all duration-700 ease-out',
		label: 'h-16 text-copy-12 text-tertiary',
	},

	variants: {
		color: {
			neutral: {
				piece: 'bg-utility-neutral-100 z-10',
			},

			primary: {
				piece: 'bg-utility-brand-300 z-20',
			},

			secondary: {
				piece: 'bg-utility-brand-400 z-30',
			},
		},
	},
});

/**
 * Supported color keys for individual stacked bar pieces.
 */
export type BarPieceColor = 'neutral' | 'primary' | 'secondary';

/**
 * Map of color keys to percentage height values for a bar column.
 */
export type BarPiece = Record<BarPieceColor, number>;

/**
 * Properties for the {@link ChartBarItem} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export interface ChartBarItemProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
	/**
	 * Dataset containing initial and final metric heights for animated bar states.
	 */
	data: {
		/**
		 * Initial metrics distribution state.
		 */
		initial: BarPiece;

		/**
		 * Target metrics distribution state.
		 */
		final: BarPiece;
	};

	/**
	 * Synchronized transition state flag provided by `useChartSync`.
	 * Toggles the rendered dataset between `initial` and `final` metric values.
	 * @default false
	 */
	isFinalState?: boolean;
}

/**
 * Single animated column component for the dashboard bar chart widget.
 * Renders stacked bar pieces dynamically toggled by the synchronized state flag.
 *
 * @param props - The component props defined by {@link ChartBarItemProps}.
 * @returns The rendered chart bar item node.
 */
export const ChartBarItem = (props: ChartBarItemProps): JSX.Element => {
	const { children, data, isFinalState, className, ...rest } = props;
	const { base, inner, piece, label } = styles();

	const currentData = isFinalState ? data.final : data.initial;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='chart-bar' className={base({ className })}>
			<Box as='div' className={inner()}>
				{Object.entries(currentData).map(([key, value]) => (
					<Box key={key} as='div' style={{ height: `${value}%` }} className={piece({ color: key as BarPieceColor })} />
				))}
			</Box>

			<Box as='div' className={label()}>
				{children}
			</Box>
		</Box>
	);
};
