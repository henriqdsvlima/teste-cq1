import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import * as Chart from 'chart.js';

export interface ResultTable {
	Dia: number;
	Data: string;
	Valor: number;
	VariacaoDiaAnterior: number;
	VariacaoPrimeiraData: number;
}

@Component({
	selector: 'app-stock-table',
	templateUrl: './stock-table.component.html',
	styleUrls: ['./stock-table.component.scss']
})




export class StockTableComponent implements OnInit, AfterViewInit {
	@Input() assetSymbol: string | undefined;
	chart: any;
	stockData: any | null = null
	tableData: any[] = []
	constructor(private apiService: ApiService, private http: HttpClient) { }
	ngOnInit(): void {

	}

	ngOnChanges(): void {
		if (this.assetSymbol) {
			this.apiService.fetchStockData(this.assetSymbol, '1mo').subscribe(
				(data) => {
					console.log('API Response:', data);
					this.stockData = data;
					this.extractTableData();
				},
				(error) => {
					console.error('Erro ao buscar dados da API:', error);
				}
			);
		}
	}



	extractTableData(): void {
		if (this.stockData) {
			const entries = this.stockData.chart.result[0].indicators.quote[0]?.open;
			const timestamps = this.stockData.chart.result[0].timestamp;

			if (entries && timestamps) {
				this.tableData = entries.slice(1, 29).map((openPrice: any, index: any) => {
					const currentDate = this.formatTimestampToDateString(timestamps[index]);
					const previousOpenPrice = entries[index];
					const firstOpenPrice = entries[0];

					return {
						Dia: index + 2,
						Data: currentDate,
						Valor: openPrice ?? 0,
						VariacaoDiaAnterior: this.calculateVariation(openPrice, previousOpenPrice),
						VariacaoPrimeiraData: this.calculateVariation(openPrice, firstOpenPrice),
					};
				});
			}
		}
	}

	formatTimestampToDateString(timestamp: number): string {
		const date = new Date(timestamp * 1000);
		return date.toISOString().split('T')[0];
	}

	calculateVariation(currentPrice: number, referencePrice: number): string {
		if (referencePrice !== undefined) {
			const variation = ((currentPrice - referencePrice) / referencePrice) * 100;
			return variation.toFixed(2) + '%';
		}
		return '-';
	}



	calculateVariationFirstDate(openPrice: number | undefined): string | null {
		const firstOpenPrice = this.stockData.chart.result[0].indicators.quote[0]?.open[0];
		if (firstOpenPrice !== undefined && openPrice !== undefined) {
			const variation = ((openPrice - firstOpenPrice) / firstOpenPrice) * 100;
			return variation.toFixed(2) + '%';
		}
		return null;
	}



	ngAfterViewInit(): void {
		if (this.assetSymbol) {
			this.apiService.fetchStockData(this.assetSymbol, '1mo').subscribe(
				(data) => {
					console.log('API Response:', data);
					this.stockData = data;
					this.extractTableData();

				},
				(error) => {
					console.error('Erro ao buscar dados da API:', error);
				}
			);
		}
	}

}
