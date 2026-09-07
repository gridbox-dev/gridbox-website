/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { ScreenMockup } from '@/components/ui/screen-mockup';
import { tv } from '@/config/ui/tw-variants';

const styles = tv({
	slots: {
		base: 'mobile:max-tablet:scale-[0.620155] tablet:max-laptop:scale-[0.826873] origin-top-left',
	},
});

/**
 * Specialized screen mockup instance for the landing page hero section.
 * Wraps a {@link ScreenMockup} frame with responsive matrix scaling transform steps
 * to maintain crisp pixel density across viewports.
 *
 * @returns The rendered hero screen mockup node.
 */
export const HeroMockup = (): JSX.Element => {
	const { base } = styles();

	return (
		<ScreenMockup
			data-hero='screen-mockup'
			classNames={{
				container: base(),
			}}
		>
			Hero screen mockup
		</ScreenMockup>
	);
};
