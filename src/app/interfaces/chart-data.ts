import { Quote } from "../core/responses/api.models";

export interface ChartData {
	name: string;
	series: ChartSeries[];
}

export interface ChartSeries {
	name: string;
	value: number;
}


interface ChartInfo {
	result: ChartResult[];
}

interface ChartResult {
	indicators: ChartIndicators;
	timestamp: number[];
}

interface ChartIndicators {
	quote: Quote[];
}
