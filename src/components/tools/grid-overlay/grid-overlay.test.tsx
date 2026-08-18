/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

// @vitest-environment jsdom

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { env } from '@/config/env';
import GridOverlay from './grid-overlay';

/**
 * Mocks environment for testing.
 */
vi.mock('@/config/env', () => ({
	env: {
		isProduction: false,
	},
}));

/**
 * Test suite for {@link GridOverlay}.
 * Validates visibility toggles, environment restrictions and event handling.
 */
describe('GridOverlay', () => {
	afterEach(() => {
		vi.mocked(env).isProduction = false;
	});

	/**
	 * Verifies that the overlay is strictly disabled in production environments,
	 * preventing debug grids from rendering regardless of keyboard inputs.
	 */
	it('should not be rendered in production', () => {
		vi.mocked(env).isProduction = true;
		render(<GridOverlay />);

		fireEvent.keyDown(window, { key: 'g', ctrlKey: true, shiftKey: true });
		expect(document.querySelector('#grid-overlay')).toBeNull();

		vi.mocked(env).isProduction = false;
	});

	/**
	 * It verifies that the grid overlay is hidden by default upon mounting.
	 */
	it('should be hidden by default', () => {
		render(<GridOverlay />);
		expect(document.querySelector('#grid-overlay')).toBeNull();
	});

	/**
	 * Verifies visibility toggling using the standard shortcut on Windows/Linux.
	 */
	it('should toggle visibility by pressing Ctrl + Shift + G', () => {
		render(<GridOverlay />);

		fireEvent.keyDown(window, { key: 'g', ctrlKey: true, shiftKey: true });
		expect(document.querySelector('#grid-overlay')).not.toBeNull();

		fireEvent.keyDown(window, { key: 'g', ctrlKey: true, shiftKey: true });
		expect(document.querySelector('#grid-overlay')).toBeNull();
	});

	/**
	 * Verifies visibility toggling using the standard shortcut on macOS.
	 */
	it('should toggle visibility by pressing Cmd + Shift + G', () => {
		render(<GridOverlay />);

		fireEvent.keyDown(window, { key: 'g', metaKey: true, shiftKey: true });
		expect(document.querySelector('#grid-overlay')).not.toBeNull();

		fireEvent.keyDown(window, { key: 'g', metaKey: true, shiftKey: true });
		expect(document.querySelector('#grid-overlay')).toBeNull();
	});

	/**
	 * Verifies that the keyboard shortcut is ignored when the focus is inside editable form controls.
	 */
	it('should not be triggered if user is typing in an input field', () => {
		render(
			<div>
				<input data-testid='test-input' />
				<GridOverlay />
			</div>,
		);

		const input = screen.getByTestId('test-input');
		input.focus();

		fireEvent.keyDown(input, { key: 'g', ctrlKey: true, shiftKey: true });
		expect(document.querySelector('#grid-overlay')).toBeNull();
	});
});
