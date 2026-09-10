/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

import { useEffect, useRef, useState } from 'react';

/**
 * Options for configuring the {@link useChartSync} hook.
 */
export interface UseChartSyncOptions {
	/**
	 * Toggles continuous looping between initial and target animation states.
	 * @default true
	 */
	loop?: boolean;

	/**
	 * Interval duration in milliseconds for state toggling when looping is enabled.
	 * @default 2500
	 */
	intervalMs?: number;

	/**
	 * IntersectionObserver visibility ratio threshold required to trigger the animation sequence.
	 * @default 0.2
	 */
	threshold?: number;
}

/**
 * Custom hook for synchronizing animation states across multiple dashboard chart widgets.
 * Uses a single IntersectionObserver and unified timer interval to keep transitions perfectly aligned.
 *
 * @param options - Configuration options defined by {@link UseChartSyncOptions}.
 * @returns Ref container to observe alongside the active transition state flag (`isFinalState`).
 */
export const useChartSync = (options: UseChartSyncOptions = {}) => {
	const { loop = true, intervalMs = 2500, threshold = 0.2 } = options;

	const containerRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState<boolean>(false);
	const [isFinalState, setIsFinalState] = useState<boolean>(false);

	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{ threshold },
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, [threshold]);

	useEffect(() => {
		if (!isInView) {
			setIsFinalState(false);
			return;
		}

		if (loop) {
			const timer = setInterval(() => {
				setIsFinalState((prev) => !prev);
			}, intervalMs);

			return () => clearInterval(timer);
		}

		const timer = setTimeout(() => {
			setIsFinalState(true);
		}, 300);

		return () => clearTimeout(timer);
	}, [isInView, loop, intervalMs]);

	return {
		containerRef,
		isFinalState,
	};
};
