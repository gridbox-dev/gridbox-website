/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Home = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
			<title>Home icon</title>

			<path
				stroke='currentColor'
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M8 17h8M11 2.8 4.2 8l-.8.8-.3.6-.1 1.2v7.2q0 1.6.2 2.1t.9.9q.5.3 2.1.2h11.6q1.6 0 2.1-.2t.9-.9q.3-.5.2-2.1V9.4l-.4-.6-.8-.8L13 2.8l-.7-.5h-.6q-.2 0-.7.5'
			/>
		</svg>
	);
};
