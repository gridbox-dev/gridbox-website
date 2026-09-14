/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Dataflow02 = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Dataflow icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M4 18v-.2c0-1.7 0-2.5.3-3.2q.5-.8 1.3-1.3c.7-.3 1.5-.3 3.2-.3h6.4q2.3 0 3.2.3.8.5 1.3 1.3c.3.7.3 1.5.3 3.2v.2M4 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4m16 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 0V8M6 8h12q1.3 0 1.8-.2a2 2 0 0 0 1-1q.3-.5.2-1.8t-.2-1.8a2 2 0 0 0-1-1Q19.3 2 18 2H6q-1.4 0-1.8.2a2 2 0 0 0-1 1Q3 3.7 3 5t.2 1.8q.3.7 1 1 .5.3 1.8.2'
			/>
		</svg>
	);
};
