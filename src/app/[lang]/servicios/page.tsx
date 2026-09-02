/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Services overview page view component.
 * Encapsulates the complete catalog of engineering and consulting services view.
 * @returns The rendered services page view node.
 */
export default async function ServicesPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='services-page' background='primary'>
			ServicesPage
		</Page>
	);
}
