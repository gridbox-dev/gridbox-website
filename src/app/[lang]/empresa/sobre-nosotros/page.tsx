/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * About us page view component.
 * Encapsulates the company overview, team information and brand mission view.
 * @returns The rendered about us page view node.
 */
export default async function AboutUsPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='about-us-page' background='primary'>
			AboutUsPage
		</Page>
	);
}
