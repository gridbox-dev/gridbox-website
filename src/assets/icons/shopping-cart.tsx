/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const ShoppingCart = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>ShoppingCart icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M5 14h13.1q1.5 0 2-.2t.8-.8q.3-.4.4-1.8l.6-5.3v-.6l-.2-.2L21 5H4.5M2 2h1.7l.3.3v.5l1 14.4v.5l.3.2.5.1H19M8 21.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m9 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0'
			/>
		</svg>
	);
};
