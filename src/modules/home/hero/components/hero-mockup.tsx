/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { ScreenMockup, type ScreenMockupProps } from '@/components/ui/screen-mockup';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: [
			'relative z-10 shrink-0 transition-transform duration-75 ease-out',
			'mobile:max-tablet:scale-[0.62] origin-top-left',
			'tablet:max-laptop:scale-[0.82] origin-top-left',
			'laptop:max-desktop:scale-[0.88] laptop:origin-top',
		].join(' '),
	},
});

/**
 * Specialized screen mockup instance for the landing page hero section.
 * Applies responsive scale transforms and transform-origins aligned with the design system.
 *
 * @returns The rendered hero screen mockup node.
 */
export const HeroMockup = (props: ScreenMockupProps): JSX.Element => {
	const { children, ...rest } = props;
	const { base } = styles();

	return (
		<ScreenMockup {...rest} data-hero='screen-mockup' classNames={{ container: base() }}>
			{children}
		</ScreenMockup>
	);
};
