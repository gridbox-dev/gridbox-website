/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { type ElementType, isValidElement, type JSX, type ReactNode } from 'react';
import { Box } from '@/components/base/box';
import { Link as BaseLink, type LinkProps as BaseLinkProps } from '@/components/base/link';
import { tv } from '@/config/ui/tw-variants';
import { cloneContentToChildren } from '@/handlers/client/clone-content-to-children';
import { isReactComponent } from '@/handlers/client/is-react-component';
import type { ComponentIcon } from '@/types/components';

const styles = tv({
	slots: {
		base: [
			'group cursor-pointer overflow-hidden relative inline-flex items-center justify-center h-max',
			'whitespace-nowrap outline-brand transition duration-100 ease-linear select-none',
			'before:absolute focus-visible:outline-2 focus-visible:outline-offset-2',
			'disabled:cursor-not-allowed disabled:opacity-50',
			'active:scale-[0.97] active:duration-75',
			'*:data-icon:pointer-events-none *:data-icon:size-20 *:data-icon:shrink-0 *:data-icon:transition-inherit-all',
		].join(' '),
		label: 'font-medium px-2',
		icon: 'pointer-events-none size-20 stroke-[1.67px] transition-inherit-all',
	},

	variants: {
		size: {
			md: {
				base: ['gap-4 rounded-12 text-copy-14'].join(' '),
			},

			lg: {
				base: ['gap-6 rounded-12 text-copy-16'].join(' '),
			},
		},

		variant: {
			gray: {
				base: [
					'justify-normal text-tertiary hover:text-tertiary_hover',
					'*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover',
				].join(' '),
				icon: 'text-fg-quaternary hover:text-fg-quaternary_hover',
			},

			color: {
				base: [
					'justify-normal text-brand-secondary hover:text-brand-secondary_hover',
					'*:data-icon:text-fg-brand-secondary_alt hover:*:data-icon:text-fg-brand-secondary_hover',
				].join(' '),
				icon: 'text-fg-brand-secondary_alt hover:text-fg-brand-secondary_hover',
			},
		},
	},

	defaultVariants: {
		size: 'md',
		variant: 'gray',
	},
});

/**
 * Props for the high-level UI {@link Link} component.
 * Extends {@link BaseLinkProps} generically to preserve polymorphism (`as` / `asChild`),
 * React Aria accessibility features, and Next.js SPA navigation while adding design system
 * variant styling and icon slots.
 *
 * @typeParam E - The underlying HTML element or React component type to render. Defaults to `'a'`.
 */
export type LinkProps<E extends ElementType = 'a'> = BaseLinkProps<E> & {
	/**
	 * Specifies the size hierarchy of the link, controlling typography and icon bounds.
	 * @default 'md'
	 */
	size?: 'md' | 'lg';

	/**
	 * Specifies the visual style variant controlling color tokens and hover fills.
	 * @default 'gray'
	 */
	variant?: 'gray' | 'color';

	/**
	 * An icon component or instantiated React element rendered before the link label.
	 */
	iconLeading?: ComponentIcon;

	/**
	 * An icon component or instantiated React element rendered after the link label.
	 */
	iconTrailing?: ComponentIcon;
};

/**
 * High-level interactive navigation link component.
 * Extends the low-level `BaseLink` primitive by providing structured slots for leading
 * and trailing icons, an encapsulated label wrapper, and support for polymorphic rendering.
 *
 * @typeParam E - The underlying HTML element or React component type to render.
 * @param props - Component configuration conforming to {@link LinkProps}.
 * @returns The rendered styled navigation link element or slotted component node.
 */
export const Link = <E extends ElementType = 'a'>(props: LinkProps<E>): JSX.Element => {
	const {
		size,
		variant,
		asChild,
		iconLeading: IconLeading,
		iconTrailing: IconTrailing,
		children,
		className,
		...rest
	} = props;

	const { base, icon, label } = styles({ size, variant });

	const content = (node: ReactNode) => (
		<>
			{isValidElement(IconLeading) && IconLeading}
			{isReactComponent(IconLeading) && <IconLeading data-link='icon' data-icon='leading' className={icon()} />}

			{node && (
				<Box as='span' data-link='label' data-text className={label()}>
					{node}
				</Box>
			)}

			{isValidElement(IconTrailing) && IconTrailing}
			{isReactComponent(IconTrailing) && <IconTrailing data-link='icon' data-icon='trailing' className={icon()} />}
		</>
	);

	return (
		<BaseLink {...(rest as BaseLinkProps<E>)} asChild={asChild} data-link='container' className={base({ className })}>
			{cloneContentToChildren(children, content, asChild)}
		</BaseLink>
	);
};
