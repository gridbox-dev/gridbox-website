/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Route = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Route icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M11.5 5h.4q4.4-.1 5.2.5.7.8.6 1.9-.2 1-4 3.4l-4 2.9Q6 16 5.8 17a2 2 0 0 0 .6 1.9q.7.6 5.2.5h.9M8 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m14 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0'
			/>
		</svg>
	);
};
