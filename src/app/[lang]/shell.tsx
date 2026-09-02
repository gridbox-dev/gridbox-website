/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX, PropsWithChildren } from 'react';
import { Box } from '@/components/base/box';

/**
 * Fundamental layout composition and application shell container.
 * Serves as the primary structural wrapper responsible for encapsulating page content,
 * layout modules, and regional components inside the main document content tree.
 *
 * @param props - Component options conforming to {@link PropsWithChildren}.
 * @returns The rendered application shell container hierarchy.
 */
export const Shell = (props: PropsWithChildren): JSX.Element => {
	const { children } = props;

	return (
		<Box as='div' data-layout='shell'>
			<Box as='main' data-layout='main-content'>
				{children}
			</Box>
		</Box>
	);
};
