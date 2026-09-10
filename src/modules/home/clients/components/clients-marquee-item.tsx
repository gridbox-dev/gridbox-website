/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { isValidElement, type JSX } from 'react';
import { Box, type BoxProps } from '@/components/base/box';
import { VisuallyHidden } from '@/components/base/visually-hidden';
import { tv } from '@/config/ui/tw-variants';
import { isReactComponent } from '@/handlers/client/is-react-component';
import type { ComponentIcon } from '@/types/components';

const styles = tv({
	slots: {
		base: [
			'flex items-center justify-center size-full',
			'*:data-icon:overflow-visible *:data-icon:text-fg-tertiary',
		].join(' '),
		logo: 'overflow-visible w-full text-fg-tertiary',
	},
});

/**
 * Properties for the {@link ClientsMarqueeItem} subcomponent.
 * Extends primitive `div` element props while omitting polymorph controls.
 */
export interface ClientsMarqueeItemProps extends Omit<BoxProps<'div'>, 'as' | 'asChild'> {
	/**
	 * Accessible label text describing the client or partner brand for screen readers.
	 */
	label?: string;

	/**
	 * Component icon or React SVG node representing the client brand logo.
	 */
	logo: ComponentIcon;
}

/**
 * Individual brand logo presenter component rendered inside {@link ClientsMarquee}.
 * Handles accessible screen reader text via visually hidden elements while rendering SVG logos safely.
 *
 * @param props - Component options defined by {@link ClientsMarqueeItemProps}.
 * @returns The rendered marquee item inner node.
 */
export const ClientsMarqueeItem = (props: ClientsMarqueeItemProps): JSX.Element => {
	const { label, logo: Logo, className, ...rest } = props;
	const { base, logo } = styles();

	return (
		<Box {...(rest as BoxProps<'div'>)} as='div' data-clients='marquee-item' className={base()}>
			<VisuallyHidden as='p'>{label}</VisuallyHidden>

			{isValidElement(Logo) && Logo}
			{isReactComponent(Logo) && <Logo data-icon aria-hidden='true' className={logo({ className })} />}
		</Box>
	);
};
