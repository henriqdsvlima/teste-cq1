export interface StockPriceData {
	day: string,
	date: string;
	value: number,
	variationFromPrevious?: string;
	variationFromFirst?: string;
}
