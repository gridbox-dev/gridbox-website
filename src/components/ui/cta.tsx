/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react/jsx-runtime';
import { Link, type LinkProps } from '@/components/base/link';
import { Button, type ButtonProps } from '@/components/ui/button';

/**
 * Structural configuration object mapping a call-to-action hierarchy level
 * to its button variant, destination link, and ARIA modal attributes.
 */
interface CTAHierarchyConfig {
	/**
	 * Visual variant assigned to the underlying {@link Button} component.
	 */
	variant: Extract<ButtonProps<'button'>['variant'], 'primary' | 'outline'>;

	/**
	 * Target URL or query parameter string assigned to the inner {@link Link}.
	 */
	href: string;

	/**
	 * Indicates the availability and type of interactive popup element created by the CTA.
	 */

	ariaHasPopup?: ButtonProps<'button'>['aria-haspopup'];

	/**
	 * Identifies the target modal element controlled by the CTA.
	 */
	ariaControls?: string;
}

/**
 * Preserved business logic levels for call-to-action intent.
 */
export type CTAHierarchy = 'conversion' | 'scheduling';

/**
 * Props for the specialized {@link CTA} component.
 * Extends base {@link ButtonProps} while replacing variant selection with a business-driven `hierarchy` prop
 * and omitting polymorphic overrides (`as` / `asChild`).
 */
export interface CTAProps
	extends Omit<ButtonProps<'button'>, 'variant' | 'asChild' | 'as' | 'aria-haspopup' | 'aria-controls'> {
	hierarchy: CTAHierarchy;
}

/**
 * Mapping dictionary defining preset design system tokens and ARIA linkages
 * for each call-to-action hierarchy level.
 */
const CTA_HIERARCHY_MAP: Record<CTAHierarchy, CTAHierarchyConfig> = {
	conversion: {
		variant: 'primary',
		href: '#contacto',
	},

	scheduling: {
		variant: 'outline',
		// biome-ignore lint/security/noSecrets: False positive. It's a simple search param.
		href: '?modal=scheduling',
		ariaHasPopup: 'dialog',
		ariaControls: 'scheduling-modal',
	},
};

/**
 * Specialized call-to-action component for primary lead conversion and meeting scheduling.
 * Composes a styled {@link Button} using `asChild` wrapping an accessible primitive {@link Link},
 * enforcing accessibility attributes (`aria-haspopup`, `aria-controls`) based on the selected `hierarchy`.
 *
 * @param props - Configuration properties conforming to {@link CTAProps}.
 * @returns The rendered call-to-action button-link node.
 */
export const CTA = (props: CTAProps): JSX.Element => {
	const { children, hierarchy, size, iconLeading, iconTrailing, ...rest } = props;
	const config = CTA_HIERARCHY_MAP[hierarchy];

	return (
		<Button
			asChild
			aria-haspopup={config.ariaHasPopup}
			aria-controls={config.ariaControls}
			size={size}
			variant={config.variant}
			iconLeading={iconLeading}
			iconTrailing={iconTrailing}
		>
			<Link {...(rest as LinkProps<'a'>)} href={config.href}>
				{children}
			</Link>
		</Button>
	);
};
