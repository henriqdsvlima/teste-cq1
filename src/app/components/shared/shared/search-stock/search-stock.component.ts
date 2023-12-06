import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-search-stock',
	templateUrl: './search-stock.component.html',
	styleUrls: ['./search-stock.component.scss']
})
export class SearchStockComponent {

	//pegar do pokeapi
	searchStock!: FormGroup

	constructor(private fb: FormBuilder) {
		this.searchStock = this.fb.group({
			inputValue: ['', Validators.required]
		});
	}


	onSubmit() {
		if (this.searchStock.valid) {
			const userInput = this.searchStock.value.inputValue;
			console.log('User Input:', userInput);
			// Aqui você pode adicionar a lógica para lidar com a entrada do usuário.
		} else {
			console.log('Formulário inválido. Corrija os erros antes de enviar.');
		}
	}
}
