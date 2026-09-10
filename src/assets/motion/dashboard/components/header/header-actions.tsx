/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { Children, cloneElement, isValidElement, type JSX, type ReactElement } from 'react';
import { Search } from '@/assets/icons/search';
import { Box, type BoxProps } from '@/components/base/box';
import { Button, type ButtonProps } from '@/components/ui/button';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'flex items-center justify-end gap-8 size-fit',
});

/**
 * Properties for the {@link HeaderActions} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type HeaderActionsProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Fixed compact size variant enforced across all header action buttons.
 */
const BUTTON_SIZE: ButtonProps['size'] = 'xs';

/**
 * Action items container for the dashboard section header.
 * Prepends a default search action button and normalizes all child buttons to a uniform compact size (`xs`) via React element cloning.
 *
 * @param props - The component props defined by {@link HeaderActionsProps}.
 * @returns The rendered header actions container element node.
 */
export const HeaderActions = (props: HeaderActionsProps): JSX.Element => {
	const { children, className, ...rest } = props;

	const formattedChildren = Children.map(children, (child) => {
		if (!isValidElement(child)) return child;

		const childProps = child.props as ButtonProps;

		return cloneElement(child as ReactElement<ButtonProps>, {
			...childProps,
			size: BUTTON_SIZE,
		});
	});

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='header-actions' className={styles({ className })}>
			<Button size={BUTTON_SIZE} variant='outline' iconLeading={Search} />
			{formattedChildren}
		</Box>
	);
};
