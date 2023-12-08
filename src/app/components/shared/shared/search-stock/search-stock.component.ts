import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/core/services/api.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-search-stock',
	templateUrl: './search-stock.component.html',
	styleUrls: ['./search-stock.component.scss']
})
export class SearchStockComponent {
	@Output() searchSubmitted = new EventEmitter<string>();
	//pegar do pokeapi
	searchStock!: FormGroup
	errorMessage: string | null = null

	constructor(private fb: FormBuilder, private apiService: ApiService) {
		this.searchStock = this.fb.group({
			inputValue: ['', Validators.required]
		});
	}


	/**
	 * This method is triggered when a form is submitted. It checks if the form is valid,
	 * retrieves the user input, emits an event with the input value, and calls an API service
	 * to fetch stock data. It handles the API response and error accordingly.
	 */
	onSubmit(): void {
		if (this.searchStock.valid) {
			const userInput = this.searchStock.value.inputValue;
			this.searchSubmitted.emit(userInput);

			this.apiService.fetchStockData(userInput).subscribe(
				(data) => {
					console.log('Stock data:', data);
					// Handle the received data from the API, such as displaying it in a chart or updating the view.
					this.errorMessage = null
				},
				(error) => {
					console.error('Error fetching stock data:', error);
					// Handle the error as needed (e.g., displaying an error message to the user).
					this.showErrorPopup('Insira um simbolo válido');
				}
			);
		} else {
			console.log('Invalid form. Please correct the errors before submitting.');
		}
	}

	showErrorPopup(message: string): void {
		Swal.fire({
			icon: 'error',
			title: 'Erro ao pesquisar ativo!',
			text: message,
		});
	}
}
