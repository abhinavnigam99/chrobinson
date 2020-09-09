import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DrilldownComponent } from './drilldown/drilldown.component';
import { HomeD3Component } from './home-d3/home-d3.component';
import { DrilldownD3Component } from './drilldown-d3/drilldown-d3.component';


const routes: Routes = [
  { path: 'homeD3', component: HomeD3Component },
  { path: 'drilldownD3', component: DrilldownD3Component },
  { path: 'home', component: HomeComponent },
  { path: 'drilldown', component: DrilldownComponent },
  {
    path: '',
    redirectTo: '/homeD3',
    pathMatch: 'full'
  },
  { path: '**', component: HomeD3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
