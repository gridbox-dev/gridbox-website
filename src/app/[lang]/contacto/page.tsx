/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Contact page view component.
 * Encapsulates the contact form and communication channels view.
 * @returns The rendered contact page view node.
 */
export default async function ContactPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='contact-page' background='primary'>
			ContactPage
		</Page>
	);
}
