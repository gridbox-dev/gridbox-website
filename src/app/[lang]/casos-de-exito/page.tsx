/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Success stories page view component.
 * Encapsulates the case studies and success stories view.
 * @returns The rendered success stories page view node.
 */
export default async function SuccessStoriesPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='success-stories-page' background='primary'>
			SuccessStoriesPage
		</Page>
	);
}
