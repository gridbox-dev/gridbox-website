/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { type ElementType, isValidElement, type JSX, useId } from 'react';
import { Input as BaseInput, type InputProps as BaseInputProps } from '@/components/base/input';
import { tv } from '@/config/ui/tw-variants';
import { isReactComponent } from '@/handlers/client/is-react-component';
import type { ComponentIcon } from '@/types/components';
import { Box } from '../base/box';
import { Text } from '../base/text';

const styles = tv({
	slots: {
		base: ['flex flex-col gap-6 min-w-320'].join(' '),
		inner: ['flex flex-col gap-6'].join(' '),
		fieldLabel: [
			'flex items-center gap-2',
			'text-copy-14 font-medium text-secondary',
			'*:data-[textarea=label-asterisk]:text-brand-tertiary dark:*:data-[textarea=label-asterisk]:text-utility-brand-600',
		].join(' '),
		fieldOuter: [
			'group relative overflow-hidden flex items-start gap-8 py-8 px-12 transition duration-100 ease-linear',
			'bg-primary border border-primary rounded-12 shadow-xs',
			'ring-2 ring-transparent',
			'focus-within:ring-brand',
			'*:data-icon:pointer-events-none *:data-icon:size-20 *:data-icon:stroke-[1.67px] *:data-icon:text-fg-quaternary *:data-icon:mt-2',
		].join(' '),
		field: [
			'w-full outline-0 ring-0 bg-transparent text-primary resize-y min-h-80',
			'placeholder:text-placeholder',
			'read-only:cursor-default read-only:select-text',
			'[&:-webkit-autofill]:[transition:background-color_5000s_ease-in-out_0s]',
			'[&:-webkit-autofill]:[box-shadow:0_0_0_1000px_var(--color-bg-primary,#fff)_inset]',
			'[&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-text-primary,currentColor)]',
		].join(' '),
		icon: ['pointer-events-none size-20 stroke-[1.67px] text-fg-quaternary mt-2'].join(' '),
		hint: [
			'w-full text-copy-12',
			'data-[textarea=hint-text]:text-tertiary data-[textarea=error-message]:text-error-primary',
		].join(' '),
	},

	variants: {
		size: {
			sm: {
				field: 'text-copy-14 min-h-64',
			},
			md: {
				field: 'text-copy-16 min-h-96',
				icon: 'size-20 stroke-[1.67px]',
			},
			lg: {
				fieldOuter: 'py-10 px-14 rounded-16',
				field: 'text-copy-16 min-h-128',
				icon: 'size-20 stroke-[1.67px]',
			},
		},

		isInvalid: {
			true: {
				fieldOuter: 'ring-error focus-within:ring-error',
			},
		},

		isDisabled: {
			true: {
				fieldOuter: 'opacity-50 cursor-not-allowed bg-tertiary',
				field: 'cursor-not-allowed',
			},
		},

		isReadOnly: {
			true: {
				fieldOuter: 'bg-secondary/50 focus-within:ring-transparent',
			},
		},
	},

	defaultVariants: {
		size: 'md',
	},
});

/**
 * Props for the high-level UI {@link Textarea} component.
 * Extends {@link BaseInputProps} with `as="textarea"` generically to preserve polymorphism,
 * React Aria accessibility hooks, and HTML textarea attributes while overriding the native `size`.
 *
 * @typeParam E - The underlying HTML element or React component type to render. Defaults to `'textarea'`.
 */
export type TextareaProps<E extends ElementType = 'textarea'> = Omit<BaseInputProps<E>, 'size'> & {
	/**
	 * Specifies the size hierarchy controlling min-height, padding, gap, and typography.
	 * @default 'md'
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * An icon component or instantiated React element rendered before the textarea element field.
	 */
	iconLeading?: ComponentIcon;

	/**
	 * An icon component or instantiated React element rendered after the textarea element field.
	 */
	iconTrailing?: ComponentIcon;
};

/**
 * High-level accessible multi-line text input component.
 * Polymorphically wraps low-level `BaseInput` rendering as a `'textarea'`, preserving design system
 * tokens, validation state handling, accessible label/error linkage via `aria-*`, and icon slots.
 *
 * @typeParam E - The underlying HTML element or React component type to render. Defaults to `'textarea'`.
 * @param props - Component configuration properties conforming to {@link TextareaProps}.
 * @returns The rendered styled textarea component.
 */
export const Textarea = <E extends ElementType = 'textarea'>(props: TextareaProps<E>): JSX.Element => {
	const {
		size,
		id: idProp,
		isInvalid = false,
		isDisabled = false,
		isReadOnly = false,
		isRequired = false,
		errorMessage,
		label,
		description,
		iconLeading: IconLeading,
		iconTrailing: IconTrailing,
		className,
		...rest
	} = props;

	const { base, inner, fieldLabel, fieldOuter, field, icon, hint } = styles({
		size,
		isInvalid,
		isDisabled,
		isReadOnly,
	});

	const generatedId = useId();
	const id = idProp || generatedId;
	const labelId = `${id}-label`;
	const descriptionId = `${id}-description`;
	const errorId = `${id}-error`;

	return (
		<Box
			as='div'
			data-textarea='container-outer'
			data-disabled={isDisabled || undefined}
			data-readonly={isReadOnly || undefined}
			data-invalid={isInvalid || undefined}
			className={base({ className })}
		>
			<Box as='div' data-textarea='container-inner' className={inner()}>
				{label && (
					<Text as='label' id={labelId} htmlFor={id} data-textarea='label' className={fieldLabel()}>
						{label}
						{isRequired && (
							<Text as='span' data-textarea='label-asterisk' aria-hidden='true'>
								*
							</Text>
						)}
					</Text>
				)}

				<Box as='div' data-textarea='field-wrapper' className={fieldOuter()}>
					{isValidElement(IconLeading) && IconLeading}
					{isReactComponent(IconLeading) && <IconLeading data-textarea='icon' data-icon='leading' className={icon()} />}

					<BaseInput
						as='textarea'
						{...(rest as BaseInputProps<ElementType>)}
						id={id}
						data-textarea='field'
						isInvalid={isInvalid}
						isDisabled={isDisabled}
						isReadOnly={isReadOnly}
						isRequired={isRequired}
						aria-labelledby={label ? labelId : undefined}
						aria-describedby={isInvalid && errorMessage ? errorId : description ? descriptionId : undefined}
						className={field()}
					/>

					{isValidElement(IconTrailing) && IconTrailing}
					{isReactComponent(IconTrailing) && (
						<IconTrailing data-textarea='icon' data-icon='trailing' className={icon()} />
					)}
				</Box>
			</Box>

			{isInvalid && errorMessage ? (
				<Text as='p' id={errorId} data-textarea='error-message' className={hint()}>
					{typeof errorMessage === 'function'
						? errorMessage({
								isInvalid: true,
								validationErrors: [String(errorMessage)],
								validationDetails: {} as ValidityState,
							})
						: errorMessage}
				</Text>
			) : (
				description && (
					<Text as='p' id={descriptionId} data-textarea='hint-text' className={hint()}>
						{description}
					</Text>
				)
			)}
		</Box>
	);
};
