/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { MotionDashboard } from '@/assets/motion/dashboard';
import { VisuallyHidden } from '@/components/base/visually-hidden';
import type { CTAHierarchy } from '@/components/ui/cta';
import type { InferDictionary } from '@/config/i18n';
import type { BaseComponent } from '@/types/components';
import { HeroActions } from './components/hero-actions';
import { HeroAnimationProvider } from './components/hero-animation-provider';
import { HeroBackground } from './components/hero-background';
import { HeroContainer } from './components/hero-container';
import { HeroHeader } from './components/hero-header';
import { HeroMockup } from './components/hero-mockup';
import { HeroWrapper } from './components/hero-wrapper';

/**
 * Properties for the {@link HomeHero} server component.
 * Extends base component interfaces with localized content attributes.
 */
export interface HomeHeroProps extends BaseComponent {
	/**
	 * Localized dictionary content for the landing hero section.
	 */
	content: InferDictionary<'home'>['hero'];
}

/**
 * Primary landing page hero section.
 * Coordinates localized copy, call-to-action triggers, background layers, and
 * wraps the layout in a client animation provider for entrance and pinning effects.
 *
 * @param props - Component options defined by {@link HomeHeroProps}.
 * @returns The rendered server component node.
 */
export const HomeHero = (props: HomeHeroProps): JSX.Element => {
	const { dark, content } = props;

	return (
		<HeroAnimationProvider>
			<HeroWrapper id='inicio' dark={dark} aria-labelledby='hero-heading'>
				<HeroContainer layout='contained' data-animate='hero-header'>
					<HeroHeader>
						<HeroHeader.Heading id='hero-heading' data-animate='fade'>
							{content.title}
						</HeroHeader.Heading>

						<HeroHeader.Paragraph data-animate='fade'>{content.description}</HeroHeader.Paragraph>
					</HeroHeader>

					<VisuallyHidden as='h2'>{content.subtitle}</VisuallyHidden>

					<HeroActions>
						{content.callToActions.map((cta) => (
							<HeroActions.CTA
								key={cta.type}
								hierarchy={cta.type as CTAHierarchy}
								aria-label={cta.ariaLabel}
								data-animate='fade'
							>
								{cta.label}
							</HeroActions.CTA>
						))}
					</HeroActions>
				</HeroContainer>

				<HeroContainer layout='full'>
					<HeroMockup data-animate='slide'>
						<MotionDashboard {...content.mockup} />
					</HeroMockup>

					<HeroBackground />
				</HeroContainer>
			</HeroWrapper>
		</HeroAnimationProvider>
	);
};
