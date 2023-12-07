import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { Chart, Result } from 'src/app/core/responses/api.models';
import { ApiService } from 'src/app/core/services/api.service';
import { StockPriceData } from 'src/app/interfaces/stock-data';
import { Indicators } from '../../../core/responses/api.models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

	selectedAsset: string | undefined;

	onSearchSubmitted(stockSymbol: string): void {
		this.selectedAsset = stockSymbol;
	}


	constructor(private apiService: ApiService) {

	}
}

