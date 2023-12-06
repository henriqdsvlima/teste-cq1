import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { StockPriceData } from 'src/app/interfaces/stock-data';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

	data: StockPriceData[] = []

	ngOnInit(): void {

	}

	constructor(private apiService: ApiService) {

	}
}
