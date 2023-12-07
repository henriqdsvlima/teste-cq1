import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { SearchStockComponent } from './search-stock/search-stock.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
	declarations: [
		HeaderComponent,
		StockTableComponent,
		SearchStockComponent,

	],
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	exports: [
		HeaderComponent,
		StockTableComponent,
		SearchStockComponent
	]
})
export class SharedModule { }
