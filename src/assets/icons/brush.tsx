/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Brush = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Brush icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m9 11.2 3.8 3.8M8 21c-1.4 1.3-4 1-6 1 1-2-.3-4.6 1-6a3.5 3.5 0 0 1 5 5m4-5 9-10a2.2 2.2 0 0 0-3-3L8 12l-.8 1a2 2 0 0 0 0 2q0 .4.8 1l1 .9a2 2 0 0 0 2 0z'
			/>
		</svg>
	);
};
