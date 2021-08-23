import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConstructorComponent } from './constructor/constructor.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverComponent } from './driver/driver.component';
import { DriversComponent } from './drivers/drivers.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { MapComponent } from './map/map.component';
import { StandingsComponent } from './standings/standings.component';

const routes: Routes = [
  {path: 'hall-of-fame', component: HallOfFameComponent, data: {title: 'Hall Of Fame'}},
  {path: 'drivers', component: DriversComponent},
  {path: 'drivers/:id', component: DriverComponent},
  {path: 'constructors', component: ConstructorsComponent},
  {path: 'constructors/:id', component: ConstructorComponent },
  {path: '', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
