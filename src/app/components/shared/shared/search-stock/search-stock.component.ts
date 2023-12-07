import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Result } from 'src/app/core/responses/api.models';
import { inject } from '@angular/core/testing';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
	selector: 'app-search-stock',
	templateUrl: './search-stock.component.html',
	styleUrls: ['./search-stock.component.scss']
})
export class SearchStockComponent {
	@Output() searchSubmitted = new EventEmitter<string>();
	//pegar do pokeapi
	searchStock!: FormGroup

	constructor(private fb: FormBuilder, private apiService: ApiService) {
		this.searchStock = this.fb.group({
			inputValue: ['', Validators.required]
		});
	}


	onSubmit() {
		if (this.searchStock.valid) {
			const userInput = this.searchStock.value.inputValue;
			this.searchSubmitted.emit(userInput);

			// Chama o serviço para buscar dados do ativo
			this.apiService.fetchStockData(userInput).subscribe(
				(data) => {
					console.log('Dados do ativo:', data);
					// Aqui você pode lidar com os dados recebidos da API, como exibir em um gráfico ou atualizar a exibição.
				},
				(error) => {
					console.error('Erro ao buscar dados do ativo:', error);
					// Lide com o erro conforme necessário (por exemplo, exibindo uma mensagem de erro para o usuário).
				}
			);
		} else {
			console.log('Formulário inválido. Corrija os erros antes de enviar.');
		}
	}
}
