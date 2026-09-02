/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactCompiler: true,
	devIndicators: false,
	typedRoutes: true,
	experimental: {
		optimizePackageImports: ['gsap', 'tailwind-variants'],
	},
};

export default nextConfig;
