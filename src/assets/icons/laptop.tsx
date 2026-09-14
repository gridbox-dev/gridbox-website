/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Laptop = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Laptop icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M3 16V7.2q0-1.6.2-2.1t.9-.9Q4.6 4 6.2 4h11.6q1.6 0 2.1.2t.9.9q.3.5.2 2.1V16h-5.8l-.3.1-.4.4h0l-.4.4h-.3l-.5.1h-3.1l-.3-.1-.4-.4h0L9 16h-.3l-.5-.1zm0 0a1 1 0 0 0-1 1v1.5A2 2 0 0 0 3.6 20l1.2.1h15.8a2 2 0 0 0 1.4-1.5l.1-1.2v-.6a1 1 0 0 0-.7-.7H20'
			/>
		</svg>
	);
};
