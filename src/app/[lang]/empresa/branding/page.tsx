/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Branding guidelines page view component.
 * Encapsulates the brand identity and showcase view.
 * @returns The rendered branding page view node.
 */
export default async function BrandingPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='branding-page' background='primary'>
			BrandingPage
		</Page>
	);
}
