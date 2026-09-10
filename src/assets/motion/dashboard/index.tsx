/*---------------------------------------------------------------------------------------------
 * Copyright (c) Gridbox Development SpA. All rights reserved.
 * No license available. See LICENSE file in the project root for license information.
 * Gridbox Development Official Website.
 *--------------------------------------------------------------------------------------------*/

'use client';

import type { JSX } from 'react';
import { Download } from '@/assets/icons/download';
import { Settings } from '@/assets/icons/settings';
import { Button } from '@/components/ui/button';
import { Card } from './components/card';
import { CardRow } from './components/card/card-row';
import { BarChart } from './components/charts/bar-chart';
import { DonutChart } from './components/charts/donut-chart';
import { DashboardContent } from './components/dashboard-content';
import { DashboardWrapper } from './components/dashboard-wrapper';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { TableFiltersBar } from './components/table/table-filters-bar';
import { MOCK_CHART_SERIES } from './constants/bar-chart-data';
import { useChartSync } from './hooks/use-chart-sync';
import { useDashboardAnimate } from './hooks/use-dashboard-animate';

/**
 * Properties for the {@link MotionDashboard} component.
 */
export interface MotionDashboardProps {
	/**
	 * Header titles and action label localized dictionary content.
	 */
	header: {
		/**
		 * Primary page heading string.
		 */
		title: string;

		/**
		 * Action button text keys.
		 */
		actions: {
			/**
			 * Customize settings button text.
			 */
			customize: string;

			/**
			 * Export report button text.
			 */
			export: string;
		};
	};

	/**
	 * Dashboard widget data cards localized dictionary content.
	 */
	widgets: {
		/**
		 * ROI metric bar chart card strings and time series axis values.
		 */
		ROICard: {
			title: string;
			description: string;
			months: Array<string>;
		};

		/**
		 * Retention metric donut chart card strings.
		 */
		retentionCard: {
			title: string;
			description: string;
			metric: {
				badge: string;
				title: string;
				description: string;
			};
		};

		/**
		 * Active clients data table section strings and filter button labels.
		 */
		clientsTable: {
			title: string;
			description: string;
			actions: {
				all: string;
				active: string;
				archive: string;
			};
		};
	};
}

/**
 * Interactive preview dashboard layout component for the website hero section.
 * Coordinates sidebar navigation, top header actions, synchronized chart cards, and filtered data tables.
 *
 * @param props - Component options defined by {@link MotionDashboardProps}.
 * @returns The rendered hero preview dashboard component node.
 */
export const MotionDashboard = (props: MotionDashboardProps): JSX.Element => {
	const { header, widgets } = props;
	const { containerRef: animateRef } = useDashboardAnimate();
	const { containerRef: syncRef, isFinalState } = useChartSync({ intervalMs: 2500 });

	return (
		<DashboardWrapper ref={animateRef}>
			<Sidebar />

			<DashboardContent>
				<Header>
					<Header.Heading>{header.title}</Header.Heading>

					<Header.Actions>
						<Button variant='outline' iconLeading={Settings}>
							{header.actions.customize}
						</Button>

						<Button variant='primary' iconLeading={Download}>
							{header.actions.export}
						</Button>
					</Header.Actions>
				</Header>

				<CardRow ref={syncRef}>
					<Card data-animate='roi-card'>
						<Card.ContentBlock withBorder>
							<Card.Text highlight>{widgets.ROICard.title}</Card.Text>
							<Card.Text>{widgets.ROICard.description}</Card.Text>
						</Card.ContentBlock>

						<Card.ContentBlock fullHeight>
							<BarChart>
								{widgets.ROICard.months.map((month, index) => {
									const series = MOCK_CHART_SERIES[index] ?? MOCK_CHART_SERIES[0];

									return (
										<BarChart.Item key={month} data={series} isFinalState={isFinalState}>
											{month}
										</BarChart.Item>
									);
								})}
							</BarChart>
						</Card.ContentBlock>
					</Card>

					<Card stretch data-animate='retention-card'>
						<Card.ContentBlock withBorder>
							<Card.Text highlight>{widgets.retentionCard.title}</Card.Text>
							<Card.Text>{widgets.retentionCard.description}</Card.Text>
						</Card.ContentBlock>

						<Card.ContentBlock>
							<DonutChart isFinalState={isFinalState}>
								<DonutChart.Gauge label={widgets.retentionCard.metric.badge} />
							</DonutChart>
						</Card.ContentBlock>

						<Card.ContentBlock>
							<Card.Text highlight>{widgets.retentionCard.metric.title}</Card.Text>
							<Card.Text>{widgets.retentionCard.metric.description}</Card.Text>
						</Card.ContentBlock>
					</Card>
				</CardRow>

				<Card data-animate='clients-table'>
					<Card.ContentBlock withBorder>
						<Card.Text highlight>{widgets.clientsTable.title}</Card.Text>
						<Card.Text>{widgets.clientsTable.description}</Card.Text>
					</Card.ContentBlock>

					<Card.ContentBlock withBorder>
						<TableFiltersBar>
							<Button variant='outline'>{widgets.clientsTable.actions.all}</Button>
							<Button variant='ghost'>{widgets.clientsTable.actions.active}</Button>
							<Button variant='ghost'>{widgets.clientsTable.actions.archive}</Button>
						</TableFiltersBar>
					</Card.ContentBlock>

					<Card.ContentBlock></Card.ContentBlock>
				</Card>
			</DashboardContent>
		</DashboardWrapper>
	);
};
