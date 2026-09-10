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
		base: 'flex flex-col items-center justify-center h-64 w-full',
		inner:
			'flex items-center justify-between h-fit w-full max-w-container pl-16 pr-8 tablet:pl-32 tablet:pr-24 laptop:px-32',
	},
});

/**
 * Properties for the {@link HeaderContainer} structural layout component.
 * Extends base primitive `div` element props while omitting polymorph controls and single class names.
 */
export interface HeaderContainerProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className'> {
	classNames?: {
		outer?: string;
		inner?: string;
	};
}

/**
 * Container component for centering header elements within a responsive max-width boundary.
 * Centers navigation and branding content horizontally across mobile, tablet, and desktop viewports.
 *
 * @param props - Component options defined by {@link HeaderContainerProps}.
 * @returns The rendered header container node.
 */
export const HeaderContainer = (props: HeaderContainerProps): JSX.Element => {
	const { children, classNames, ...rest } = props;
	const { base, inner } = styles();

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-header='container-outer'
			className={base({ className: classNames?.outer })}
		>
			<Box as='div' data-header='container-inner' className={inner({ className: classNames?.inner })}>
				{children}
			</Box>
		</Box>
	);
};
