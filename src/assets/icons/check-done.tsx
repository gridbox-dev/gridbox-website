/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const CheckDone = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>CheckDone icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='m6 15 2 2 4.5-4.5M8 8V5.2q0-1.6.2-2.1t.9-.9q.5-.2 2.1-.2h7.6q1.6 0 2.1.2t.9.9q.3.5.2 2.1v7.6q0 1.6-.2 2.1a2 2 0 0 1-.9.9q-.5.3-2.1.2H16M5.2 22h7.6q1.6 0 2.1-.2t.9-.9q.3-.5.2-2.1v-7.6q0-1.6-.2-2.1a2 2 0 0 0-.9-.9q-.5-.2-2.1-.2H5.2q-1.6 0-2.1.2a2 2 0 0 0-.9.9q-.2.5-.2 2.1v7.6q0 1.6.2 2.1t.9.9q.5.3 2.1.2'
			/>
		</svg>
	);
};
