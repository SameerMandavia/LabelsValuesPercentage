import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartistBarComponent } from './Components/chartist-bar/chartist-bar.component';
import { SimpleBarChartComponent } from './Components/simple-bar-chart/simple-bar-chart.component';

import { ChartistModule } from 'ng-chartist';


@NgModule({
  declarations: [
    AppComponent,
    ChartistBarComponent,
    SimpleBarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
