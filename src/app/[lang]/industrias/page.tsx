/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Industries overview page view component.
 * Encapsulates the targeted industry sectors and tailored solutions view.
 * @returns The rendered industries page view node.
 */
export default async function IndustriesPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='industries-page' background='primary'>
			IndustriesPage
		</Page>
	);
}
