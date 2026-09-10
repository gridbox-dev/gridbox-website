/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See README in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import type { HTMLAttributes, JSX } from 'react';

export const Reform = (props: HTMLAttributes<HTMLOrSVGElement>): JSX.Element => {
	return (
		<svg {...props} data-icon xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 89 16'>
			<title>Reform Logo</title>

			<path
				fill='currentColor'
				d='M.2 15.72V.28h5.4c4.35 0 7 1.63 7 5.23 0 2.43-1.32 3.82-3.2 4.51l3.93 5.7H9.28l-3.2-4.98H3.71v4.98zm3.52-7.86h1.86c2.43 0 3.37-.66 3.37-2.35 0-1.66-.94-2.35-3.37-2.35H3.72zm11.31 7.86V.28h11.08v2.96h-7.56v3.13h6.12v2.96h-6.12v3.43h7.56v2.96zm16.3 0H27.8V.28h10.5v2.96h-6.98v3.13h5.87v2.96h-5.87zM42.68 2.67 40 5.33v5.34h5.33V5.33zm10.66 0L50.68 0h-5.34v5.33h5.34zm0 10.66 2.67-2.66V5.33h-5.33v5.34zm-10.66 0L45.34 16h5.34v-5.33h-5.34zm15.04 2.39V.28h5.4c4.34 0 7 1.63 7 5.23 0 2.43-1.33 3.82-3.21 4.51l3.93 5.7H66.8l-3.21-4.98h-2.36v4.98zm3.51-7.86h1.86c2.43 0 3.37-.66 3.37-2.35 0-1.66-.94-2.35-3.37-2.35h-1.86zm11.31 7.86V.28h4.32l3.57 7 3.6-7h4.07v15.44h-3.35V4.84L81.3 11.6h-1.94L75.9 4.84v10.88z'
			/>
		</svg>
	);
};
