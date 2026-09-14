/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Rocket = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Rocket icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m13 11-9.5 9.5M14 3.5a23 23 0 0 1 6.4 6.4M9.3 8l-3-1a1 1 0 0 0-.9.2L2.6 9.5a1 1 0 0 0 .3 1.7l2.7 1m6 6.2 1 2.7a1 1 0 0 0 1.8.3l2.4-2.9q.3-.4.2-1l-1-2.8m3.3-12.4-4.9.8q-.8 0-1.3.7L6.4 11a4.7 4.7 0 0 0 6.6 6.6l7-6.6q.7-.6.8-1.4l.8-5a2 2 0 0 0-2.3-2.2'
			/>
		</svg>
	);
};
