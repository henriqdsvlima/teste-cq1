import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TokenInterceptor } from './core/token/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		SharedModule
	],
	providers: [
		HttpClient,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
