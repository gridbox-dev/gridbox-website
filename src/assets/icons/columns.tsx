/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Columns = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Columns icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M9 3v18m6-18v18M7.8 3h8.4c1.7 0 2.5 0 3.2.3q.8.5 1.3 1.3c.3.7.3 1.5.3 3.2v8.4c0 1.7 0 2.5-.3 3.2a3 3 0 0 1-1.3 1.3c-.7.3-1.5.3-3.2.3H7.8c-1.7 0-2.5 0-3.2-.3a3 3 0 0 1-1.3-1.3c-.3-.7-.3-1.5-.3-3.2V7.8c0-1.7 0-2.5.3-3.2q.5-.8 1.3-1.3C5.3 3 6.1 3 7.8 3'
			/>
		</svg>
	);
};
