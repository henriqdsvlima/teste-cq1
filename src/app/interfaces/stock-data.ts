export interface StockData {
	chart: {
		result: {
			indicators: {
				quote: {
					open: number[] | undefined;
				};
			};
		}[];
	};
}
