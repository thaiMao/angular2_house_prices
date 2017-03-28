import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';
import { PropertiesService } from '../properties.service';
import { RoutingModule } from './app-routing.module';
import 'hammerjs';

@NgModule({
  imports: [
    BrowserModule,
    RoutingModule,
    HttpModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MapComponent,
    SearchComponent
  ],
  providers: [
    PropertiesService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }