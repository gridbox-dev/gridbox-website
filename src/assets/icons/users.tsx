/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Users = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Users icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M22 21v-2a4 4 0 0 0-3-3.9M15.5 3.3a4 4 0 0 1 0 7.4M17 21q0-2.6-.3-3.5a4 4 0 0 0-2.2-2.2q-.8-.4-3.5-.3H8c-1.9 0-2.8 0-3.5.3a4 4 0 0 0-2.2 2.2q-.4.9-.3 3.5M13.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0'
			/>
		</svg>
	);
};
