/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'relative overflow-hidden flex flex-col items-center h-fit w-full bg-primary',
		container: 'flex flex-col items-center h-fit w-full max-w-container laptop:px-32',
		content: 'flex items-center h-fit w-full min-h-96 border-tertiary laptop:border-x',
	},
});

/**
 * Properties for the {@link ClientsWrapper} section component.
 * Extends standard HTML `section` props while omitting structural and polymorphic properties.
 */
export interface ClientsWrapperProps extends Omit<BoxProps<'section'>, 'id' | 'asChild' | 'as' | 'className'> {
	/**
	 * Mandatory unique DOM identifier required for anchor navigation and analytics tracking.
	 */
	id: string;

	/**
	 * Granular slot class overrides for internal wrapper, container, and content layout blocks.
	 */
	classNames?: {
		/**
		 * Custom class names applied to the outermost `section` element.
		 */
		wrapper?: string;

		/**
		 * Custom class names applied to the inner max-width container wrapper.
		 */
		container?: string;

		/**
		 * Custom class names applied to the innermost content container block.
		 */
		content?: string;
	};
}

/**
 * Outer section layout wrapper for the clients marquee section.
 * Establishes max-width bounds, responsive side borders, and structural container slots.
 *
 * @param props - Component options defined by {@link ClientsWrapperProps}.
 * @returns The rendered clients section wrapper node.
 */
export const ClientsWrapper = (props: ClientsWrapperProps): JSX.Element => {
	const { children, classNames, ...rest } = props;
	const { base, container, content } = styles();

	return (
		<Box
			{...(rest as BoxProps<'section'>)}
			as='section'
			data-clients='wrapper'
			className={base({ className: classNames?.wrapper })}
		>
			<Box as='div' data-clients='container' className={container({ className: classNames?.container })}>
				<Box as='div' data-clients='content' className={content({ className: classNames?.content })}>
					{children}
				</Box>
			</Box>
		</Box>
	);
};
