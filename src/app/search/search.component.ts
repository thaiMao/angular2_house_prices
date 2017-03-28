import { Component, Output, 
	     EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-search',
	template: `
	<span mdTooltip="Start typing in a number and then select a price">
		<md-input-container>
			<input 
			mdInput placeholder="Maximum Price"
			[mdAutocomplete]="auto" 
			[formControl]="priceCtrl" 
			type="text">
		</md-input-container>
	</span>

	<md-autocomplete #auto="mdAutocomplete">
  		<md-option 
  		*ngFor="let price of filteredPrices | async" 
  		[value]="price | currency:'GBP':true:'1.0-0'"
  		(click)="update.emit(price)">
    		{{ price | currency:'GBP':true:'1.0-0' }}
  		</md-option>
	</md-autocomplete>
	`
})

export class SearchComponent implements OnInit {
	
	priceCtrl: FormControl;
	@Output() update = new EventEmitter();

	prices: Array<number> = [ 100000,
	                          150000,
	                          200000,
	                          250000,
	                          300000,
	                          350000,
	                          400000,
	                          450000,
	                          500000,
	                          550000,
	                          600000,
	                          700000,
	                          800000,
	                          1000000,
	                          2000000,
	                          3000000 ];
	filteredPrices: any;

	ngOnInit() {
		this.update.emit('');

		this.priceCtrl = new FormControl();

		this.filteredPrices = this.priceCtrl.valueChanges
								  .startWith(null)
								  .map(price => this.filterPrices(price));
	}

	filterPrices(price: number) {

		return this.prices
		           .filter(p => p.toString().startsWith((price || '').toString()))
	}
}