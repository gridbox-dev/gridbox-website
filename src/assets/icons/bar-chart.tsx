/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const BarChart = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>BarChart icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M8 15v2m4-6v6m4-10v10m-8.2 4h8.4c1.7 0 2.5 0 3.2-.3a3 3 0 0 0 1.3-1.3c.3-.7.3-1.5.3-3.2V7.8c0-1.7 0-2.5-.3-3.2a3 3 0 0 0-1.3-1.3c-.7-.3-1.5-.3-3.2-.3H7.8c-1.7 0-2.5 0-3.2.3a3 3 0 0 0-1.3 1.3C3 5.3 3 6.1 3 7.8v8.4c0 1.7 0 2.5.3 3.2q.5.8 1.3 1.3c.7.3 1.5.3 3.2.3'
			/>
		</svg>
	);
};
