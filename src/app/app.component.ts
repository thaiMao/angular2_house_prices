import { Component } from '@angular/core';
import '../assets/css/styles.css';
@Component({
  selector: 'my-app',
  template: `
  <md-toolbar color="primary">
      	
    <button md-icon-button
    routerLink="/dashboard">
    <md-icon>dashboard</md-icon>
    </button>
  </md-toolbar>
	<router-outlet></router-outlet>
  
  `,
  styles: [`
  `]
})
export class AppComponent { }