import { ChartConfiguration } from 'chart.js';

export interface PkddChartConfiguration extends ChartConfiguration {
    dragData?: boolean;
    onDragEnd?: () => void;
    update?: () => void;
}
