/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import type { BaseComponent } from '@/types/components';
import { HeroActions } from './components/hero-actions';
import { HeroContainer } from './components/hero-container';
import { HeroHeader } from './components/hero-header';
import { HeroWrapper } from './components/hero-wrapper';

export interface HomeHeroProps extends BaseComponent {}

export const HomeHero = (props: HomeHeroProps): JSX.Element => {
	const { dark } = props;

	return (
		<HeroWrapper id='inicio' dark={dark} aria-labelledby='hero-heading'>
			<HeroContainer layout='contained'>
				<HeroHeader>
					<HeroHeader.Heading id='hero-heading'>
						Desarrollo de software a medida y consultoría estratégica TI en Chile
					</HeroHeader.Heading>

					<HeroHeader.Paragraph>
						Diseñamos productos digitales, arquitecturas robustas e integraciones complejas para empresas que buscan
						escalar operaciones y acelerar su ventaja competitiva.
					</HeroHeader.Paragraph>
				</HeroHeader>

				<HeroActions>
					<HeroActions.CTA hierarchy='scheduling'>Agendar reunión</HeroActions.CTA>
					<HeroActions.CTA hierarchy='conversion'>Solicitar presupuesto</HeroActions.CTA>
				</HeroActions>
			</HeroContainer>

			<HeroContainer layout='full'>Home hero mockup</HeroContainer>
		</HeroWrapper>
	);
};
