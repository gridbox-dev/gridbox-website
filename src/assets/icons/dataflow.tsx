/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Dataflow = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Dataflow icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M11 4.5h7.3q1.6 0 2.1.2t.9.9q.3.5.2 2.1V9q0 1.4-.2 1.8a2 2 0 0 1-1 1q-.5.3-1.8.2M13 19.5H5.7q-1.6 0-2.1-.2a2 2 0 0 1-.9-.9q-.2-.5-.2-2.1V15q0-1.4.2-1.8a2 2 0 0 1 1-1q.5-.2 1.8-.2m4.8 2.5h3.9l.2-.3.1-.5V9.8l-.3-.2-.5-.1H9.8l-.2.3-.1.5v3.9l.3.2zm7.5 7.5h3.9l.2-.3.1-.5v-3.9l-.3-.2-.5-.1h-3.9l-.2.3-.1.5v3.9l.3.2zM2.8 7h3.9l.2-.3.1-.5V2.3L6.6 2H2.3l-.2.3-.1.5v3.9l.3.2z'
			/>
		</svg>
	);
};
