import { Component, OnInit } from '@angular/core';
import { F1Service } from '../services/f1.service';

@Component({
  selector: 'app-year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss']
})
export class YearSelectComponent {

  public selectedYear: number;
  years: number[] = [];  

  constructor(private f1service: F1Service) {
    this.selectedYear = new Date().getFullYear();
    for (let year = this.selectedYear; year >= 1950; year--) {
      this.years.push(year);
    }
  }

  changeYear(event) {
    this.f1service.setSelectedYear(event.value)
  }

  getYear() {
    return this.selectedYear
  }

}