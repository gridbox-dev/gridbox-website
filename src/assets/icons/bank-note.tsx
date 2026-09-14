/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const BankNote = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>BankNote icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M14 9h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10m2-7v1m0 6v1M2 8.2v7.6q0 1.6.2 2.1t.9.9q.5.3 2.1.2h13.6q1.6 0 2.1-.2t.9-.9q.3-.5.2-2.1V8.2q0-1.6-.2-2.1a2 2 0 0 0-.9-.9q-.5-.3-2.1-.2H5.2q-1.6 0-2.1.2a2 2 0 0 0-.9.9Q2 6.6 2 8.2M18.5 12a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m-12 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0'
			/>
		</svg>
	);
};
