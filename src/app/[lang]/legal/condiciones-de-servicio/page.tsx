/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Terms of service legal page view component.
 * Encapsulates the legal terms, platform usage conditions and service agreement documentation view.
 * @returns The rendered terms of service page view node.
 */
export default async function TermsOfServicePage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='terms-of-service-page' background='primary'>
			TermsOfServicePage
		</Page>
	);
}
