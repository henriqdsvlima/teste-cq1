// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { StockResponse } from '../responses/api.models';
import { environment } from '../environment/environment';
import { ApiError, ApiErrorType } from '../responses/api-error';



@Injectable({
	providedIn: 'root'
})
export class ApiService {

	// Base URL for the API. Update this as per your API endpoint.
	private baseUrl = environment.apiUrl;

	constructor(private http: HttpClient) { }

	// Get one item by ID
	fetchStockData(endpoint: string): Observable<StockResponse> {
		return this.http.get<StockResponse>(`${this.baseUrl}${endpoint}`).pipe(
			map((data) => data),
			catchError(this.handleError)
		);
	}


	private handleError(error: HttpErrorResponse): Observable<never> {
		let apiError: ApiError;

		// Se o erro for uma resposta HTTP
		if (error.error instanceof Object) {
			apiError = error.error as ApiError;
		} else {
			apiError = {
				type: ApiErrorType.err1,
				message: 'Something went wrong. Please try again later.',
			};
		}

		return new Observable((observer) => {
			observer.error(apiError);
		});
	}
}


