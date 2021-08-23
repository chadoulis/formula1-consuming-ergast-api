import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatLabel } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { DriverComponent } from './driver/driver.component';
import { ConstructorComponent } from './constructor/constructor.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatDialogModule } from '@angular/material/dialog';
import { YearSelectComponent } from './year-select/year-select.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { DriversComponent } from './drivers/drivers.component';
import { ConstructorsComponent } from './constructors/constructors.component';
import { MatSelectModule } from '@angular/material/select';
import { BackButtonDirective } from './directives/back-button.directive';
import { ForwardButtonDirective } from './directives/forward-button.directive';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';


@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    DashboardComponent,
    DriverComponent,
    ConstructorComponent,
    MapComponent,
    YearSelectComponent,
    DriversComponent,
    ConstructorsComponent,
    BackButtonDirective,
    ForwardButtonDirective,
    HallOfFameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSortModule,
    MatButtonToggleModule,
    FontAwesomeModule,
    LeafletModule,
    MatDialogModule,
    MatSliderModule,
    HammerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [BackButtonDirective, ForwardButtonDirective],
  providers: [YearSelectComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
  
})
export class AppModule { }
