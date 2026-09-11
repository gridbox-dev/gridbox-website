/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import { usePathname } from 'next/navigation';
import type { JSX } from 'react';
import { Logo } from '@/assets/logos/logo';
import { Link, type LinkProps } from '@/components/base/link';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config/i18n/constants';
import { tv } from '@/config/ui/tw-variants';
import type { Language } from '@/types/i18n';

const styles = tv({
	base: 'h-24 text-utility-neutral-800 hover:text-utility-neutral-900 transition duration-100 ease-linear',
});

/**
 * Properties for the {@link LogoLink} navigation anchor component.
 * Extends base {@link LinkProps} while omitting structural children and fixed root path binding (`href`).
 */
export type LogoLinkProps = Omit<LinkProps, 'as' | 'asChild' | 'href' | 'children'>;

/**
 * Brand logo link component wrapping the official Gridbox Development SVG logo.
 * Redirects users to the application root route (`/`) with smooth color transition states.
 *
 * @param props - Component options conforming to {@link LogoLinkProps}.
 * @returns The rendered brand logo link node.
 */
export const LogoLink = (props: LogoLinkProps): JSX.Element => {
	const { className, ...rest } = props;
	const pathname = usePathname();

	const segments = pathname?.split('/').filter(Boolean) ?? [];
	const currentLocale = (
		SUPPORTED_LOCALES.includes(segments[0] as Language) ? segments[0] : DEFAULT_LOCALE
	) as Language;

	return (
		<Link {...(rest as LinkProps)} href={`/${currentLocale}`}>
			<Logo className={styles({ className })} />
		</Link>
	);
};
