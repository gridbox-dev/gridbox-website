/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Server = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Server icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m22 10.5-.5-3.8q-.2-2-.6-2.8a3 3 0 0 0-1.3-1.1q-.7-.4-2.8-.3H7.2q-2 0-2.8.3A3 3 0 0 0 3 3.9q-.4.7-.6 2.8L2 10.5m3.5 4h13m-13 0a3.5 3.5 0 1 1 0-7h13a3.5 3.5 0 1 1 0 7m-13 0a3.5 3.5 0 1 0 0 7h13a3.5 3.5 0 1 0 0-7M12 11h6m-6 7h6'
			/>
		</svg>
	);
};
