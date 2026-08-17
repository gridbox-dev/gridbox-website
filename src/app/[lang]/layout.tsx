/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { Metadata } from 'next';
import type { JSX, PropsWithChildren } from 'react';
import { env } from '@/config/env';
import { getDictionary, type InferDictionary } from '@/config/i18n/dictionaries';
import { fontSans, fontSerif } from '@/config/ui/fonts';
import { DEFAULT_LOCALE } from '@/proxy';
import type { Language } from '@/types/common/i18n';
import type { StaticParams } from '@/types/common/next';

import '@/styles/globals.css';

/**
 * Generates the static route parameters for internationalization at build time.
 * @returns A promise resolving to an array of supported language parameter objects.
 */
// biome-ignore lint/suspicious/useAwait: Required async signature for Next.js generateStaticParams.
export async function generateStaticParams(): Promise<Array<{ lang: string }>> {
	return [{ lang: 'es' }, { lang: 'en' }];
}

/**
 * Generates dynamic metadata for the root layout based on the active locale.
 * @param props - Object containing route parameters wrapped in a Promise.
 * @returns A promise that resolves to the complete Next.js {@link Metadata} object.
 */
// biome-ignore lint/complexity/noExcessiveLinesPerFunction: Root SEO and metadata declarations require extensive object configurations.
export async function generateMetadata({ params }: StaticParams): Promise<Metadata> {
	const { lang } = await params;

	const metadata = (await getDictionary(
		lang as Language,
		'metadata',
	)) as InferDictionary<'metadata'>;

	const baseURL = env.baseURL || 'https://www.gridbox.dev';
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

		title: metadata.title,
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
					url: '/images/misc/opengraph-image.jpg',
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
				url: '/images/misc/opengraph-image.jpg',
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

/**
 * Root layout component for the application.
 * @param props - Properties containing children nodes and static route params.
 * @returns The root HTML document structure.
 */
async function RootLayout(props: PropsWithChildren<StaticParams>): Promise<JSX.Element> {
	const { children, params } = props;
	const { lang } = await params;

	return (
		<html
			lang={lang || DEFAULT_LOCALE}
			className={`${fontSans.variable} ${fontSerif.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}

export default RootLayout;
