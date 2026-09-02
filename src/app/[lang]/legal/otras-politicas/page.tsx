/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Additional company policies page view component.
 * Encapsulates supplementary compliance guidelines, corporate policies, and operational disclosures view.
 * @returns The rendered additional policies page view node.
 */
export default async function OtherPoliciesPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='other-policies-page' background='primary'>
			OtherPoliciesPage
		</Page>
	);
}
