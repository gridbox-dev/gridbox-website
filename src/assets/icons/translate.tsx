/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Translate = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
			<title>Translate icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M10.76 14.17h5.98m-5.98 0-1.6 3.33m1.6-3.33 2.39-5c.2-.4.29-.6.42-.66a.4.4 0 0 1 .36 0c.13.06.23.26.42.66l2.39 5m0 0 1.6 3.33M1.66 4.17h5m0 0h2.91m-2.91 0V2.5m2.91 1.67h2.09m-2.09 0a15 15 0 0 1-2.77 6.57m1.52.93a8 8 0 0 1-1.52-.93m0 0A8.6 8.6 0 0 1 4.17 7.5m2.64 3.24A14.4 14.4 0 0 1 1.67 15'
			/>
		</svg>
	);
};
