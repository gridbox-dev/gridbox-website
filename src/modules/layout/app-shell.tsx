/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { JSX, PropsWithChildren } from 'react';
import GridOverlay from '@/components/tools/grid-overlay/grid-overlay';

/**
 * Provides the core structural shell wrapping global UI elements,
 * landmark tags and page children.
 * @param props - Component props containing React child elements.
 * @returns The rendered application shell layout.
 */
function AppShell(props: PropsWithChildren): JSX.Element {
	const { children } = props;

	return (
		<div id='app-shell'>
			{<GridOverlay />}
			<main id='main-content'>{children}</main>
		</div>
	);
}

export default AppShell;
