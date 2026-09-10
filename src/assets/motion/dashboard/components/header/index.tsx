/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';
import { HeaderActions } from './header-actions';
import { HeaderHeading } from './header-heading';

const styles = tv({
	base: 'flex justify-between h-fit w-full',
});

/**
 * Properties for the {@link Header} component.
 * Extends base `div` element props while omitting unused primitive props.
 */
export type HeaderProps = Omit<BoxProps<'div'>, 'as' | 'asChild'>;

/**
 * Base layout container for the dashboard section header.
 * Provides a flexbox wrapper configured for space-between alignment.
 *
 * @param props - The component props defined by {@link HeaderProps}.
 * @returns The rendered header base element node.
 */
const HeaderBase = (props: HeaderProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-dashboard='header' className={styles({ className })}>
			{children}
		</Box>
	);
};

/**
 * Compound component for rendering dashboard section headers.
 * Combines the base header wrapper with `Heading` and `Actions` subcomponents.
 */
export const Header = Object.assign(HeaderBase, {
	Heading: HeaderHeading,
	Actions: HeaderActions,
});
