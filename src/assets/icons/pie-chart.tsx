/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const PieChart = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>PieChart icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 2a10 10 0 0 1 10 10M12 2v10m0-10a10 10 0 1 0 10 10M12 2a10 10 0 0 1 10 10m0 0H12m10 0a10 10 0 0 1-4.1 8L12 12'
			/>
		</svg>
	);
};
