import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { DrilldownComponent } from './drilldown/drilldown.component';
import { DataTablesModule } from 'angular-datatables';
import { TableComponent } from './table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { ChartD3Component } from './chart-d3/chart-d3.component';
import { HomeD3Component } from './home-d3/home-d3.component';
import { DrilldownD3Component } from './drilldown-d3/drilldown-d3.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DrilldownComponent,
    TableComponent,
    ChartComponent,
    ChartD3Component,
    HomeD3Component,
    DrilldownD3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
