import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { ApiService } from '../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { TableData } from 'src/app/interfaces/table-data';


@Component({
	selector: 'app-stock-table',
	templateUrl: './stock-table.component.html',
	styleUrls: ['./stock-table.component.scss']
})




export class StockTableComponent implements OnInit {
	@Input() assetSymbol: string | undefined;
	chart: any;
	stockData: any | null = null;
	tableData: TableData[] = [];
	chartData: any[] = [];

	constructor(private apiService: ApiService, private http: HttpClient) { }

	ngOnInit(): void { }

	ngOnChanges(): void {
		if (this.assetSymbol) {
			this.apiService.fetchStockData(this.assetSymbol, '1mo').subscribe(
				(data: any) => {
					console.log('API Response:', data);
					this.stockData = data;
					this.extractTableData();
					this.updateChartData()
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
				this.tableData = entries.slice(1, 30).map((openPrice: number, index: number) => {
					const currentDate = this.formatTimestampToDateString(timestamps[index]);
					const previousIndex = index - 1;
					const previousOpenPrice = previousIndex >= 0 ? entries[previousIndex] : undefined;
					const firstOpenPrice = entries[index];

					return {
						Dia: index + 2,
						Data: currentDate,
						Valor: openPrice ?? 0,
						VariacaoDiaAnterior: this.calculateVariation(openPrice, previousOpenPrice),
						VariacaoPrimeiraData: this.calculateVariationFirstDate(firstOpenPrice),
					};
				});
			}
		}
	}

	formatTimestampToDateString(timestamp: number): string {
		const date = new Date(timestamp * 1000);
		return date.toISOString().split('T')[0];
	}

	calculateVariation(currentPrice: number, referencePrice: number | undefined): string {
		if (referencePrice !== undefined) {
			const variation = ((currentPrice - referencePrice) / referencePrice) * 100;
			return variation.toFixed(2) + '%';
		}

		return '-';
	}

	calculateVariationFirstDate(openPrice: number | undefined): string | null {
		const firstOpenPrice = this.stockData.chart.result[0].indicators.quote[0]?.open[0];

		console.log('First Open Price:', firstOpenPrice);
		console.log('Current Open Price:', openPrice);

		if (firstOpenPrice !== undefined && openPrice !== undefined && firstOpenPrice !== 0) {
			const variation = ((openPrice - firstOpenPrice) / firstOpenPrice) * 100;
			console.log('Variation:', variation);

			return variation.toFixed(2) + '%';
		}

		return null;
	}

	updateChartData(): void {
		this.chartData = [
			{
				name: 'Valor de Abertura',
				series: this.tableData.map((entry: TableData) => ({
					name: entry.Data,
					value: entry.Valor,
				})),
			},
		];
	}
}
