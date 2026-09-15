/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

/**
 * Constant route map for services navigation items.
 * Maps i18n dictionary keys strictly to their localized URL paths.
 */
export const SERVICES_APP_ROUTES: Record<string, string> = {
	customSoftware: '/servicios/desarrollo-software-a-medida',
	systemIntegration: '/servicios/integracion-sistemas',
	websites: '/servicios/desarrollo-sitios-web',
	legacyModernization: '/servicios/modernizacion-sistemas-legacy',
	infrastructure: '/servicios/infraestructura-servidores',
	design: '/servicios/diseno-ux-ui',
	eCommerceB2B: '/servicios/ecommerce-b2b',
	eCommerceB2C: '/servicios/ecommerce-b2c',
	erpIntegration: '/servicios/integracion-erp',
	architecture: '/servicios/arquitectura-software',
	cto: '/servicios/cto-as-a-service',
	projectManagement: '/servicios/gestion-proyectos',
	itConsulting: '/servicios/consultoria-tecnologica',
	discovery: '/servicios/discovery-requerimientos',
	talentSelection: '/servicios/seleccion-talento',
} as const;

/**
 * Type representing all valid service route keys derived from {@link SERVICES_APP_ROUTES}.
 */
export type ServiceAppRouteKey = keyof typeof SERVICES_APP_ROUTES;
