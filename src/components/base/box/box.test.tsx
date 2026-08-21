/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HandledComponent } from '@/types/common/components';
import { Box } from './box';

/**
 * Test suite for {@link Box}.
 * Validates default DOM element rendering, polymorphic element switching via 'as',
 * child prop delegation using 'asChild', theme mode class injection, and architectural metadata definitions.
 */
describe('Box', () => {
	/**
	 * Verifies default HTML element rendering.
	 */
	it('should be rendered as div by default', () => {
		render(<Box id='test-box'>Default Box</Box>);
		const element = document.querySelector('#test-box');

		expect(element).not.toBeNull();
		expect(element?.tagName).toBe('DIV');
	});

	/**
	 * Verifies polymorphic element rendering via 'as' prop.
	 */
	it('should render as a custom HTML element when "as" prop is provided', () => {
		render(
			<Box as='section' id='test-section'>
				Section Content
			</Box>,
		);
		const element = document.querySelector('#test-section');

		expect(element).not.toBeNull();
		expect(element?.tagName).toBe('SECTION');
	});

	/**
	 * Verifies prop delegation onto direct child when asChild is true.
	 */
	it('should delegate props to direct child when asChild is true', () => {
		render(
			<Box asChild id='test-anchor' className='custom-box'>
				<a href='https://gridbox.cl'>Link Child</a>
			</Box>,
		);

		const anchor = screen.getByRole('link', { name: 'Link Child' });

		expect(anchor).not.toBeNull();
		expect(anchor.tagName).toBe('A');
		expect(anchor.getAttribute('id')).toBe('test-anchor');
		expect(anchor.classList.contains('custom-box')).toBe(true);
	});

	/**
	 * Verifies dark mode theme class application.
	 */
	it('should append "dark-mode" class when theme is "dark"', () => {
		render(
			<Box id='dark-box' theme='dark' className='p-4'>
				Dark Mode Content
			</Box>,
		);
		const element = document.querySelector('#dark-box');

		expect(element?.classList.contains('dark-mode')).toBe(true);
		expect(element?.classList.contains('p-4')).toBe(true);
	});

	/**
	 * Verifies light mode theme does not append dark-mode class.
	 */
	it('should not append "dark-mode" class when theme is "light"', () => {
		render(
			<Box id='light-box' theme='light' className='p-4'>
				Light Mode Content
			</Box>,
		);
		const element = document.querySelector('#light-box');

		expect(element?.classList.contains('dark-mode')).toBe(false);
		expect(element?.classList.contains('p-4')).toBe(true);
	});

	/**
	 * Verifies component architectural metadata assignment.
	 */
	it('should have architectural metadata defined', () => {
		const handledBox = Box as HandledComponent;

		expect(handledBox.componentId).toBe('Box');
		expect(handledBox.componentLayer).toBe('base');
	});
});
