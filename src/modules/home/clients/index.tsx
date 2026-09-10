/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX } from 'react';
import { VisuallyHidden } from '@/components/base/visually-hidden';
import type { InferDictionary } from '@/config/i18n';
import type { BaseComponent } from '@/types/components';
import { ClientsMarquee } from './components/clients-marquee';
import { ClientsWrapper } from './components/clients-wrapper';
import { CLIENTS_LOGOS_MAP } from './constants/clients-logos';

/**
 * Properties for the {@link HomeClients} server component.
 * Extends base component props with localized client section dictionary content.
 */
export interface HomeClientsProps extends BaseComponent {
	/**
	 * Localized dictionary content for the clients landing section.
	 */
	content: InferDictionary<'home'>['clients'];
}

/**
 * Primary clients and partners marquee section.
 * Coordinates accessible hidden headers with a responsive logo grid that matches
 * localized keys against {@link CLIENTS_LOGOS_MAP}.
 *
 * @param props - Component options defined by {@link HomeClientsProps}.
 * @returns The rendered server component node.
 */
export const HomeClients = (props: HomeClientsProps): JSX.Element => {
	const { dark, content } = props;

	return (
		<ClientsWrapper id='nuestros-clientes' dark={dark} aria-labelledby='clients-heading'>
			<VisuallyHidden as='h2' id='clients-heading'>
				{content.title}
			</VisuallyHidden>

			<VisuallyHidden as='p' id='clients-list-title'>
				{content.description}
			</VisuallyHidden>

			<ClientsMarquee aria-describedby='clients-list-title'>
				{content.logos.map(({ key, label }) => {
					const config = CLIENTS_LOGOS_MAP[key];

					if (!config) return null;

					return <ClientsMarquee.Item key={key} label={label} logo={config.logo} className={config.className} />;
				})}
			</ClientsMarquee>
		</ClientsWrapper>
	);
};
