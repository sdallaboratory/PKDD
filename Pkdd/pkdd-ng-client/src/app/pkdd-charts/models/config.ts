import { ChartConfiguration } from 'chart.js';

export interface PkddChartConfiguration extends ChartConfiguration {
    dragData?: boolean;
    onDragStart?: (event: MouseEvent) => void;
    onDragEnd?: (event: MouseEvent) => void;
    update?: () => void;
}
