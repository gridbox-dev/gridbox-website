/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Page } from '@/components/layout/page';
import { Divider } from '@/components/ui/divider';
import { getDictionary, type InferDictionary } from '@/config/i18n';
import { HomeHero } from '@/modules/home/hero';
import type { Language } from '@/types/i18n';

/**
 * Root home page view component.
 * Serves as the primary landing entry point.
 * @returns The rendered home page view node.
 */
export default async function HomePage(props: PageProps<'/[lang]'>): Promise<JSX.Element> {
	const { params } = props;
	const { lang } = await params;

	const content = (await getDictionary(lang as Language, 'home')) as InferDictionary<'home'>;

	return (
		<Page id='home-page' background='primary'>
			<HomeHero content={content.hero} />
			<Divider color='tertiary' />
			<section className='h-svh' id='contacto' />
		</Page>
	);
}
