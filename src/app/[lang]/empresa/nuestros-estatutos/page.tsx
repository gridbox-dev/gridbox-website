/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Company bylaws page view component.
 * Encapsulates the corporate governance, bylaws, and compliance documentation view.
 * @returns The rendered bylaws page view node.
 */
export default async function BylawsPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='bylaws-page' background='primary'>
			BylawsPage
		</Page>
	);
}
