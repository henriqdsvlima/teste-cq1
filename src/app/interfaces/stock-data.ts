export interface StockPriceData {
	day: number,
	date: string;
	value: number,
	variationFromPrevious?: string;
	variationFromFirst?: string;
}
