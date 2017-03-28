import { Component, OnInit } from '@angular/core';
import { PropertiesService } from '../../properties.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-dashboard',
	template: `
	<md-card class="main-card">
		
		<md-card-header>
			<md-card-title>
			Residental Properties for Sale
			</md-card-title>
			<md-card-subtitle>
			Asking Prices by Location
			</md-card-subtitle>
		</md-card-header>

		<md-card-content>
			<app-search 
			class="search"
			(update)="priceSelected($event)">
			</app-search>

			<app-map
			[gb_json]="gb_json"
			[properties_json]="properties_json | async"
			></app-map>
		</md-card-content>
		<md-card-footer class="footer">
			<img 
			src="https://www.zoopla.co.uk/static/images/mashery/powered-by-zoopla-150x73.png"
			width="75" height="37"
			title="Property information powered by Zoopla" alt="Property information powered by Zoopla" border="0">
		</md-card-footer>
	</md-card>
	`,
	styles: [`
	.search {
		margin-left: 8px;
	}
	.main-card {
		margin: 2%;
		width: 70%;
	}
	.footer {
		margin: 18px;
	}
	`]
})

export class DashboardComponent implements OnInit {

	gb_json: any;
    properties_json: Observable<any>;

	constructor(private propertiesService: PropertiesService) {}

	ngOnInit() {

		//this.properties_json = this.propertiesService.getProperties();
		this.gb_json = this.propertiesService.gb_json;

	}

	priceSelected(price: any) {
		//Make HTTP get Data call
		this.properties_json = this.propertiesService
		    .getProperties(price);
	}
}