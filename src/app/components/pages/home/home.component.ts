import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { StockPriceData } from 'src/app/interfaces/stock-data';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	data: any = []

	ngOnInit(): void {

		console.log(this.getStockDataFromYahooFinances())

	}

	constructor(private apiService: ApiService) {

	}

	getStockDataFromYahooFinances() {
		this.apiService.fetchStockData('TSLA').subscribe(
			(response) => {
				this.data = response;
				console.log('Dados recebidos:', this.data);
			},
			(error) => {
				console.error('Erro ao obter dados:', error);
			}
		);
	}
}

