/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const FileSearch = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>FileSearch icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M14 11H8m2 4H8m8-8H8m12 3.5V6.8q0-2.4-.3-3.2a3 3 0 0 0-1.3-1.3c-.7-.3-1.5-.3-3.2-.3H8.8c-1.7 0-2.5 0-3.2.3a3 3 0 0 0-1.3 1.3Q4 4.5 4 6.8v10.4c0 1.7 0 2.5.3 3.2q.5.8 1.3 1.3c.7.3 1.5.3 3.2.3h2.7M22 22l-1.5-1.5m1-2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0'
			/>
		</svg>
	);
};
