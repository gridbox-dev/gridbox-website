/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX, PropsWithChildren } from 'react';
import { DEFAULT_LOCALE } from '@/proxy';
import type { StaticParams } from '@/types/common/next';

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
async function RootLayout(props: PropsWithChildren<StaticParams>): Promise<JSX.Element> {
	const { children, params } = props;
	const { lang } = await params;

	return (
		<html lang={lang || DEFAULT_LOCALE}>
			<body>{children}</body>
		</html>
	);
}

export default RootLayout;
