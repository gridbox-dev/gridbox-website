/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { Route } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type JSX, Suspense } from 'react';
import { Translate } from '@/assets/icons/translate';
import { getAlternateRoute } from '@/handlers/client/get-alternate-route';
import { Button, type ButtonProps } from './button';

/**
 * Properties for the {@link LanguageSwitcher} component.
 * Extends base button properties while omitting children, icons, and polymorphic attributes.
 */
export type LanguageSwitcherProps = Omit<
	ButtonProps<'button'>,
	'as' | 'asChild' | 'children' | 'iconLeading' | 'iconTrailing'
>;

/**
 * Inner presenter component evaluating client-side route parameters and executing imperative router navigation.
 */
const LanguageSwitcherContent = (props: LanguageSwitcherProps): JSX.Element => {
	const { className, onPress, ...rest } = props;

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { href } = getAlternateRoute(pathname || '/', searchParams?.toString());

	const handlePress = () => {
		router.push(href as Route);
	};

	return (
		<Button
			{...rest}
			as='button'
			size='sm'
			variant='tertiary'
			iconLeading={Translate}
			onPress={handlePress}
			className={className}
		/>
	);
};

/**
 * Static fallback button rendered during server-side pre-rendering (SSG).
 */
const LanguageSwitcherFallback = (props: LanguageSwitcherProps): JSX.Element => {
	const { className, ...rest } = props;

	return (
		<Button
			{...rest}
			as='button'
			size='sm'
			variant='tertiary'
			iconLeading={Translate}
			className={['pointer-events-none', className].filter(Boolean).join(' ')}
		/>
	);
};

/**
 * Interactive language switcher button component wrapped in a Suspense boundary.
 * Imperatively transitions routes via `useRouter` to guarantee clean client-side navigation.
 *
 * @param props - Component options conforming to {@link LanguageSwitcherProps}.
 * @returns The rendered language switcher button node.
 */
export const LanguageSwitcher = (props: LanguageSwitcherProps): JSX.Element => {
	return (
		<Suspense fallback={<LanguageSwitcherFallback {...props} />}>
			<LanguageSwitcherContent {...props} />
		</Suspense>
	);
};
