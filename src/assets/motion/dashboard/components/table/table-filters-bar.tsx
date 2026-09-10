/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Children, cloneElement, isValidElement, type JSX, type ReactElement } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import type { ButtonProps } from '@/components/ui/button';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'flex items-center h-fit w-fit bg-secondary rounded-10',
		button: 'shadow-none',
	},
});

export type TableFiltersBarProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

const TableFiltersBarBase = (props: TableFiltersBarProps): JSX.Element => {
	const { children, className, ...rest } = props;
	const { base, button } = styles();

	const formattedChildren = Children.map(children, (child) => {
		if (!isValidElement(child)) return child;

		const childProps = child.props as ButtonProps;

		return cloneElement(child as ReactElement<ButtonProps>, {
			...childProps,
			size: 'xs',
			className: button(),
		});
	});

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='filters' className={base({ className })}>
			{formattedChildren}
		</Box>
	);
};

export const TableFiltersBar = Object.assign(TableFiltersBarBase, {});
