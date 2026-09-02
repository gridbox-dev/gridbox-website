/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';

/**
 * Individual blog article page view component.
 * Encapsulates the detail view for a specific blog post.
 * @returns The rendered blog post detail page view node.
 */
export default async function BlogPostPage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang: _lang } = await params;

	return (
		<Page id='blog-post-page' background='primary'>
			BlogPostPage
		</Page>
	);
}
