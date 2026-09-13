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
import { tv } from '@/config/ui/tw-variants';
import { getLocalizedRoot } from '@/handlers/client/get-localized-route';

const styles = tv({
	slots: {
		base: [
			'text-utility-neutral-800 transition duration-100 ease-linear',
			'hover:text-utility-neutral-900',
			'outline-brand focus-visible:rounded-6 focus-visible:outline-2 focus-visible:outline-offset-4',
		].join(' '),
		icon: 'h-24',
	},
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
	const { base, icon } = styles();

	const pathname = usePathname();
	const href = getLocalizedRoot(pathname || '/');

	return (
		<Link {...(rest as LinkProps)} href={href} className={base({ className })}>
			<Logo className={icon()} />
		</Link>
	);
};
