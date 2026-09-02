/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { Metadata } from 'next';
import { env } from '@/config/env';
import { getDictionary, type InferDictionary } from '@/config/i18n';
import type { Language } from '@/types/i18n';

/**
 * Generates dynamic metadata for the root layout based on the active locale.
 * @param props - Object containing route parameters wrapped in a Promise.
 * @returns A promise that resolves to the complete Next.js {@link Metadata} object.
 */
export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
	const { lang } = await params;

	const metadata = (await getDictionary(lang as Language, 'metadata')) as InferDictionary<'metadata'>;

	const baseURL = env.NEXT_PUBLIC_APP_BASE_URL || 'https://www.gridbox.dev';
	const canonicalURL = `${baseURL}/${lang}`;
	const businessName = 'Gridbox Development SpA';

	return {
		metadataBase: new URL(baseURL),
		alternates: {
			canonical: canonicalURL,
			languages: {
				'es-CL': `${baseURL}/es`,
				'en-US': `${baseURL}/en`,
				'x-default': `${baseURL}/es`,
			},
		},

		title: {
			default: metadata.title.default,
			template: '%s | Gridbox',
		},
		description: metadata.description,

		referrer: 'origin-when-cross-origin',
		authors: [
			{
				name: businessName,
				url: baseURL,
			},
		],
		creator: businessName,
		publisher: businessName,
		category: 'Software Development',
		generator: 'Next.js',
		keywords: metadata.keywords,

		icons: [
			{
				rel: 'icon',
				type: 'image/svg+xml',
				url: '/icons/favicon.svg',
			},
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				url: '/icons/apple-touch-icon.png',
			},
		],

		openGraph: {
			title: metadata.title.default,
			description: metadata.description,
			url: canonicalURL,
			siteName: businessName,
			locale: lang === 'es' ? 'es_CL' : 'en_US',
			images: [
				{
					url: '/images/opengraph-image.jpg',
					height: 630,
					width: 1200,
					alt: metadata.title.default,
				},
			],
		},

		twitter: {
			title: metadata.title.default,
			description: metadata.description,
			card: 'summary_large_image',
			images: {
				url: '/images/opengraph-image.jpg',
				height: 630,
				width: 1200,
				alt: metadata.title.default,
			},
		},

		appleWebApp: {
			capable: true,
			statusBarStyle: 'default',
			title: metadata.title.default,
		},

		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
				'max-video-preview': -1,
				'max-image-preview': 'large',
				'max-snippet': -1,
			},
		},

		formatDetection: {
			email: false,
			address: false,
			telephone: false,
		},
	};
}
