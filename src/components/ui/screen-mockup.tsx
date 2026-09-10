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
		base: 'relative z-20 flex flex-col gap-6 h-193.5 w-344 max-w-none shrink-0 p-8 bg-secondary border border-secondary/50 shadow-xl rounded-16 pointer-events-none select-none',
		controlsGroup: 'flex h-fit w-full gap-8 px-6 py-4',
		control: 'size-12 rounded-9999',
		content: 'overflow-hidden flex flex-col items-center size-full bg-primary rounded-10 border border-tertiary',
	},

	variants: {
		color: {
			red: {
				control: 'bg-utility-red-500',
			},

			orange: {
				control: 'bg-utility-yellow-500',
			},

			green: {
				control: 'bg-utility-green-500',
			},
		},
	},
});

/**
 * Props for the {@link ScreenMockup} UI container component.
 * Extends base `HTMLDivElement` attributes while restricting polymorphism (`as` / `asChild`),
 * `className`, and `aria-hidden` to enforce a purely decorative window frame interface.
 */
export interface ScreenMockupProps extends Omit<BoxProps<'div'>, 'as' | 'asChild' | 'className' | 'aria-hidden'> {
	/**
	 * Optional slot-specific CSS class overrides for internal mockup elements.
	 */
	classNames?: {
		/**
		 * Custom CSS class overrides applied to the outer container element.
		 */
		container?: string;

		/**
		 * Custom CSS class overrides applied to the header window controls wrapper element.
		 */
		controlsGroup?: string;

		/**
		 * Custom CSS class overrides applied to individual window control dot elements.
		 */
		control?: string;

		/**
		 * Custom CSS class overrides applied to the inner screen viewport content element.
		 */
		content?: string;
	};
}

/**
 * Supported color variants for window management control dots.
 */
type MockupControlColor = 'red' | 'green' | 'orange';

/**
 * Internal configuration object defining a window control dot item.
 */
interface MockupControlConfig {
	/**
	 * Color identity token mapped to Tailwind design utility colors.
	 */
	color: MockupControlColor;
}

/**
 * Immutable sequence mapping the standard three macOS window controls:
 * close (red), minimize (orange), and expand (green).
 */
const MOCKUP_CONTROL_MAP: Array<MockupControlConfig> = [
	{
		color: 'red',
	},
	{
		color: 'orange',
	},
	{
		color: 'green',
	},
];

/**
 * Decorative macOS/browser-style window screen mockup component.
 * Renders an accessible-hidden UI container with classic window controls (close, minimize, expand)
 * and an inner content viewport slot.
 *
 * @param props - Configuration properties conforming to {@link ScreenMockupProps}.
 * @returns The rendered screen mockup frame node.
 */
export const ScreenMockup = (props: ScreenMockupProps): JSX.Element => {
	const { children, classNames, ...rest } = props;
	const { base, controlsGroup, control, content } = styles();

	return (
		<Box
			{...(rest as BoxProps<'div'>)}
			as='div'
			data-mockup='container'
			aria-hidden='true'
			className={base({ className: classNames?.container })}
		>
			<Box as='div' data-mockup='controls-group' className={controlsGroup({ className: classNames?.controlsGroup })}>
				{MOCKUP_CONTROL_MAP.map(({ color }) => (
					<Box
						key={`mockup-control-${color}`}
						as='div'
						data-mockup='control'
						className={control({ className: classNames?.control, color })}
					/>
				))}
			</Box>

			<Box as='div' data-mockup='content' className={content({ className: classNames?.content })}>
				{children}
			</Box>
		</Box>
	);
};
