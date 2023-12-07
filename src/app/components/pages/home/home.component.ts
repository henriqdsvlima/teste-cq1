import { Component, OnInit } from '@angular/core';


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


	constructor() {

	}
}

