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
import { getDictionary, type InferDictionary } from '@/config/i18n';
import { Header } from '@/modules/layout/header';
import type { Language } from '@/types/i18n';

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
	const { lang } = await params;

	const headerContent = (await getDictionary(lang as Language, 'header')) as InferDictionary<'header'>;

	return (
		<Box as='div' data-layout='shell'>
			{!env.IS_PRODUCTION && <GridOverlay />}

			<Scroller>
				<Header content={headerContent} />

				<Box as='main' id='main-content' data-layout='main-content'>
					{children}
				</Box>
			</Scroller>
		</Box>
	);
};
