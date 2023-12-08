
// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { environment } from '../environment/environment';
import { Root } from '../responses/api.models';



@Injectable({
	providedIn: 'root'
})
export class ApiService {

	// Base URL for the API. Update this as per your API endpoint.
	private baseUrl = environment.apiUrl;
	constructor(private http: HttpClient) { }

	// Get one item by ID
	fetchStockData(symbol: string, interval: string = '1y'): Observable<Root> {
		const url = `${this.baseUrl}/stock-data/${symbol}?interval=${interval}`;
		return this.http.get<Root>(url);
	}




}


