/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box } from '@/components/base/box';
import { Scroller } from '@/components/layout/scroller';
import { GridOverlay } from '@/components/tools/grid-overlay';
import { env } from '@/config/env';
import { Header } from '@/modules/layout/header';

/**
 * Fundamental layout composition and application shell container.
 * Serves as the primary structural wrapper responsible for encapsulating page content,
 * layout modules, and regional components inside the main document content tree.
 *
 * @param props - Component options conforming to {@link LayoutProps}.
 * @returns The rendered application shell container hierarchy.
 */
export const Shell = async (props: LayoutProps<'/[lang]'>): Promise<JSX.Element> => {
	const { children, params } = props;
	const { lang: _lang } = await params;

	return (
		<Box as='div' data-layout='shell'>
			{!env.IS_PRODUCTION && <GridOverlay />}

			<Scroller>
				<Header />

				<Box as='main' data-layout='main-content'>
					{children}
				</Box>
			</Scroller>
		</Box>
	);
};
