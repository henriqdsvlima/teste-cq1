// api.models.ts

import { StockPriceData } from "src/app/interfaces/stock-data";



export interface StockResponse {
	chart: {
		result: StockDataResult[]
		error: null
	}
	success: boolean;
}

export interface StockDataResult {
	data: StockPriceData[];
	timestamp: number[],
	indicators: {
		quote: StockDataQuote
	}
}
//
export interface StockTradingPeriod {
	timezone: string;
	start: number;
	end: number;
}


export interface StockDataQuote {
	low: [];
	open: [];
	high: [];
	volume: [];
	close: [];
}
