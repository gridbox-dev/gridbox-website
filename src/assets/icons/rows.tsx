/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Rows = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Rows icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M17.8 10q1.6 0 2.1-.2t.9-.9q.3-.5.2-2.1v-.6q0-1.6-.2-2.1a2 2 0 0 0-.9-.9q-.5-.2-2.1-.2H6.2q-1.6 0-2.1.2a2 2 0 0 0-.9.9Q3 4.6 3 6.2v.6q0 1.6.2 2.1t.9.9q.5.3 2.1.2zM17.8 21q1.6 0 2.1-.2t.9-.9q.3-.5.2-2.1v-.6q0-1.6-.2-2.1a2 2 0 0 0-.9-.9q-.5-.2-2.1-.2H6.2q-1.6 0-2.1.2a2 2 0 0 0-.9.9q-.2.5-.2 2.1v.6q0 1.6.2 2.1t.9.9q.5.3 2.1.2z'
			/>
		</svg>
	);
};
