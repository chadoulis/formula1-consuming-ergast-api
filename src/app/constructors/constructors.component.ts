import { Component, OnInit } from '@angular/core';
import { F1ConstructorDetails } from '../interfaces/f1constructor';
import { F1Service } from '../services/f1.service';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-constructors',
  templateUrl: './constructors.component.html',
  styleUrls: ['./constructors.component.css']
})
export class ConstructorsComponent implements OnInit {


  /** Font Awesome Icons */
  faWikipediaW = faWikipediaW;
  faInfoCircle = faInfoCircle;

  constructors: F1ConstructorDetails[]
  constructorsSubscription: any;

  constructor(
    private f1service: F1Service,
  ) { }

  ngOnInit() {
    /** Fetching Constructors List */
    this.constructorsSubscription = this.f1service.getConstructorsListWithYearObservable()
      .subscribe((constructorsList) => {
        this.constructors = constructorsList
      });
  }

  ngOnDestroy() {
    this.constructorsSubscription.unsubscribe()
  }

}