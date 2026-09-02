/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Individual job offer detail page view component.
 * Encapsulates the job opening details, role requirements and application entry view.
 * @returns The rendered job post detail page view node.
 */
export default async function JobPostPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='job-post-page' background='primary'>
			JobPostPage
		</Page>
	);
}
