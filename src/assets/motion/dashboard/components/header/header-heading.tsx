/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	base: 'text-copy-20 font-medium text-primary',
});

/**
 * Properties for the {@link HeaderHeading} component.
 * Extends base `span` element props while omitting unused primitive props.
 */
export type HeaderHeadingProps = Omit<BoxProps<'span'>, 'as' | 'asChild'>;

/**
 * Primary title component for the dashboard section header.
 * Renders a stylized span element configured with medium weight typographic styles.
 *
 * @param props - The component props defined by {@link HeaderHeadingProps}.
 * @returns The rendered header heading element node.
 */
export const HeaderHeading = (props: HeaderHeadingProps): JSX.Element => {
	const { children, className, ...rest } = props;

	return (
		<Box {...(rest as BoxProps<'span'>)} as='span' data-dashboard='header-heading' className={styles({ className })}>
			{children}
		</Box>
	);
};
