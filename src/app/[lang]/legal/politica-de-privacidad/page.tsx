/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Privacy policy legal page view component.
 * Encapsulates the privacy policy documentation, data collection practices and user data rights view.
 * @returns The rendered privacy policy page view node.
 */
export default async function PrivacyPolicyPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='privacy-policy-page' background='primary'>
			PrivacyPolicyPage
		</Page>
	);
}
