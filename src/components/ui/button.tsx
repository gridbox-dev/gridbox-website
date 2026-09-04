/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { type ElementType, isValidElement, type JSX, type ReactNode } from 'react';
import { Box } from '@/components/base/box';
import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@/components/base/button';
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
		icon: 'pointer-events-none size-20 shrink-0 transition-inherit-all',
	},

	variants: {
		size: {
			xs: {
				base: [
					'gap-4 py-6 px-10 text-copy-14 rounded-10',
					'before:rounded-8',
					'data-icon-only:p-8',
					'*:data-icon:size-16 *:data-icon:stroke-[1.5px]',
				].join(' '),
				icon: 'size-16 stroke-[1.5px]',
			},

			sm: {
				base: [
					'gap-4 py-8 px-12 text-copy-14 rounded-10',
					'before:rounded-8',
					'data-icon-only:p-8',
					'*:data-icon:size-20 *:data-icon:stroke-[1.67px]',
				].join(' '),
				icon: 'size-20 stroke-[1.67px]',
			},

			md: {
				base: [
					'gap-4 py-10 px-14 text-copy-14 rounded-12',
					'before:rounded-10',
					'data-icon-only:p-10',
					'*:data-icon:size-20 *:data-icon:stroke-[1.67px]',
				].join(' '),
				icon: 'size-20 stroke-[1.67px]',
			},

			lg: {
				base: [
					'gap-6 py-10 px-16 text-copy-16 rounded-12',
					'before:rounded-10',
					'data-icon-only:p-12',
					'*:data-icon:size-20 *:data-icon:stroke-[1.67px]',
				].join(' '),
				icon: 'size-20 stroke-[1.67px]',
			},

			xl: {
				base: [
					'gap-6 py-12 px-18 text-copy-16 rounded-12',
					'before:rounded-10',
					'data-icon-only:p-14',
					'*:data-icon:size-20 *:data-icon:stroke-[1.67px]',
				].join(' '),
				icon: 'size-20 stroke-[1.67px]',
			},
		},

		variant: {
			primary: {
				base: [
					'bg-utility-neutral-800 text-utility-neutral-50 shadow-xs-skeuomorphic',
					'ring-1 ring-transparent ring-inset',
					'hover:bg-utility-neutral-900 data-loading:bg-utility-neutral-900',
					'dark:bg-utility-neutral-900 dark:hover:bg-utility-neutral-800',
					'before:inset-px before:border before:border-white/12 before:mask-b-from-0%',
					'*:data-icon:text-white/60 hover:*:data-icon:text-white/70',
				].join(' '),
				icon: 'text-white/60 hover:text-white/70',
			},

			secondary: {
				base: [
					'bg-tertiary text-secondary shadow-xs',
					'ring-1 ring-transparent ring-inset',
					'after:absolute after:size-full after:transition after:duration-100 after:ease-linear',
					'hover:after:bg-black/3 hover:text-secondary_hover data-loading:after:bg-black/3',
					'*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover',
				].join(' '),
				icon: 'text-fg-quaternary hover:text-fg-quaternary_hover',
			},

			tertiary: {
				base: [
					'bg-secondary text-tertiary shadow-xs',
					'ring-1 ring-transparent ring-inset',
					'after:absolute after:size-full after:transition after:duration-100 after:ease-linear',
					'hover:after:bg-black/3 hover:text-tertiary_hover data-loading:after:bg-black/3',
					'*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover',
				].join(' '),
				icon: 'text-fg-quaternary hover:text-fg-quaternary_hover',
			},

			outline: {
				base: [
					'bg-primary text-secondary shadow-xs',
					'ring-1 ring-primary ring-inset',
					'after:absolute after:size-full after:transition after:duration-100 after:ease-linear',
					'hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover',
					'hover:after:bg-black/1 data-loading:after:bg-black/1',
					'*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover',
				].join(' '),
				icon: 'text-fg-quaternary hover:text-fg-quaternary_hover',
			},

			ghost: {
				base: [
					'text-tertiary',
					'after:absolute after:size-full after:transition after:duration-100 after:ease-linear',
					'hover:bg-primary_hover hover:text-tertiary_hover data-loading:bg-primary_hover',
					'hover:after:bg-black/1 data-loading:after:bg-black/1',
					'*:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover',
				].join(' '),
				icon: 'text-fg-quaternary hover:text-fg-quaternary_hover',
			},

			destructive: {
				base: [
					'bg-error-solid text-white shadow-xs-skeuomorphic duration-150',
					'ring-1 ring-transparent ring-inset',
					'hover:bg-error-solid_hover data-loading:bg-error-solid_hover',
					'before:inset-px before:border before:border-white/12 before:mask-b-from-0%',
					'*:data-icon:text-white/60 hover:*:data-icon:text-white/70',
				].join(' '),
				icon: 'text-white/60 hover:text-white/70',
			},

			'destructive-soft': {
				base: [
					'bg-error-primary text-error-primary shadow-xs',
					'ring-1 ring-transparent ring-inset',
					'after:absolute after:size-full after:transition after:duration-100 after:ease-linear',
					'hover:text-error-primary_hover',
					'hover:after:bg-utility-red-600/3 data-loading:after:bg-utility-red-600/3',
					'*:data-icon:text-fg-error-secondary hover:*:data-icon:text-fg-error-primary',
				].join(' '),
				icon: 'text-fg-error-secondary hover:text-fg-error-primary',
			},
		},
	},

	defaultVariants: {
		size: 'md',
		variant: 'primary',
	},
});

/**
 * Props for the high-level UI {@link Button} component.
 * Extends {@link BaseButtonProps} generically to preserve polymorphism (`as` / `asChild`),
 * React Aria accessibility features, and DOM interaction states while adding design system
 * variant styling and icon slots.
 *
 * @typeParam E - The underlying HTML element or React component type to render. Defaults to `'button'`.
 */
export type ButtonProps<E extends ElementType = 'button'> = BaseButtonProps<E> & {
	/**
	 * Specifies the size hierarchy of the button, controlling height, padding, gap, and text size.
	 * @default 'md'
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Specifies the visual style variant of the button.
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'destructive' | 'destructive-soft';

	/**
	 * An icon component or instantiated React element rendered before the button label.
	 */
	iconLeading?: ComponentIcon;

	/**
	 * An icon component or instantiated React element rendered after the button label.
	 */
	iconTrailing?: ComponentIcon;
};

/**
 * High-level interactive Button component.
 * Extends the low-level `BaseButton` primitive by providing structured slots for leading
 * and trailing icons, an encapsulated label wrapper, and support for polymorphic rendering.
 *
 * @typeParam E - The underlying HTML element or React component type to render.
 * @param props - Component configuration conforming to {@link ButtonProps}.
 * @returns The rendered interactive button element or slotted node.
 */
export const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
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

	const { base, label, icon } = styles({ size, variant });
	const isIcon = (IconLeading || IconTrailing) && !children;

	const content = (node: ReactNode) => (
		<>
			{isValidElement(IconLeading) && IconLeading}
			{isReactComponent(IconLeading) && <IconLeading data-button='icon' data-icon='leading' className={icon()} />}

			{!isIcon && (
				<Box as='span' data-button='label' data-text className={label()}>
					{node}
				</Box>
			)}

			{isValidElement(IconTrailing) && IconTrailing}
			{isReactComponent(IconTrailing) && <IconTrailing data-button='icon' data-icon='trailing' className={icon()} />}
		</>
	);

	return (
		<BaseButton
			{...(rest as BaseButtonProps<E>)}
			asChild={asChild}
			data-button='container'
			data-icon-only={isIcon || undefined}
			className={base({ className })}
		>
			{cloneContentToChildren(children, content, asChild)}
		</BaseButton>
	);
};
