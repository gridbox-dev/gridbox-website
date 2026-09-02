/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react/jsx-runtime';
import { DEFAULT_LOCALE } from '@/config/i18n/constants';
import { fontSans, fontSerif } from '@/config/ui/fonts';

import '@/styles/globals.css';

// biome-ignore lint/performance/noBarrelFile: False positive. It's not a barrel file. It's a single method in another module.
export { generateMetadata } from './metadata';

/**
 * Generates the static route parameters for internationalization at build time.
 * @returns A promise resolving to an array of supported language parameter objects.
 */
// biome-ignore lint/suspicious/useAwait: Required async signature for Next.js generateStaticParams.
export async function generateStaticParams(): Promise<Array<{ lang: string }>> {
	return [{ lang: 'es' }, { lang: 'en' }];
}

/**
 * Root layout component for the application.
 * @param props - Properties containing children nodes and static route params.
 * @returns The root HTML document structure.
 */
export default async function RootLayout(props: LayoutProps<'/[lang]'>): Promise<JSX.Element> {
	const { children, params } = props;
	const { lang } = await params;

	return (
		<html lang={lang || DEFAULT_LOCALE} className={`${fontSans.variable} ${fontSerif.variable}`}>
			<body>{children}</body>
		</html>
	);
}
