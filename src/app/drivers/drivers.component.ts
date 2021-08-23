import { Component, OnDestroy, OnInit } from '@angular/core';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Driver } from '../interfaces/f1driver';
import { F1Service } from '../services/f1.service';
import { YearSelectComponent } from '../year-select/year-select.component';


@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit, OnDestroy {

  faInfoCircle = faInfoCircle;
  faWikipediaW = faWikipediaW;
  drivers: Driver[]
  driversSubscription: any;
 

  constructor(
    private f1service: F1Service,
    private year: YearSelectComponent
  ) { }



  getYear(){
    return this.year.getYear() 
  }


  ngOnInit() {



    this.driversSubscription = this.f1service.getDriverListObservable()
    .subscribe((driversList) => {
      this.drivers = driversList
    });
  }

  ngOnDestroy() {
    this.driversSubscription.unsubscribe()
  }

}