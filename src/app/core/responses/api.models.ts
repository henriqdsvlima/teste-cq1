export interface Root {
	chart: Chart
}

export interface Chart {
	result: Result[]
	error: any
}

export interface Result {
	timestamp: any
	meta: Meta
	indicators: Indicators
}

export interface Meta {
	currency: string
	symbol: string
	exchangeName: string
	instrumentType: string
	firstTradeDate: number
	regularMarketTime: number
	gmtoffset: number
	timezone: string
	exchangeTimezoneName: string
	regularMarketPrice: number
	chartPreviousClose: number
	previousClose: number
	scale: number
	priceHint: number
	currentTradingPeriod: CurrentTradingPeriod
	dataGranularity: string
	range: string
	validRanges: string[]
}

export interface CurrentTradingPeriod {
	pre: Pre
	regular: Regular
	post: Post
}

export interface Pre {
	timezone: string
	start: number
	end: number
	gmtoffset: number
}

export interface Regular {
	timezone: string
	start: number
	end: number
	gmtoffset: number
}

export interface Post {
	timezone: string
	start: number
	end: number
	gmtoffset: number
}

export interface Indicators {
	quote: Quote[]
}

export interface Quote {
	close: number[],
	open: number[] | undefined
}

export interface Chart {
	result: Result[];
	// Outras propriedades, se existirem
}
