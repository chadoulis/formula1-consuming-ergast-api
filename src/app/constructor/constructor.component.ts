import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { F1ConstructorDetails } from '../interfaces/f1constructor';
import { F1Service } from '../services/f1.service';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';
import { faIdBadge } from '@fortawesome/free-regular-svg-icons';
import { faBirthdayCake, faPassport, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-constructor',
  templateUrl: './constructor.component.html',
  styleUrls: ['./constructor.component.scss']
})
export class ConstructorComponent implements OnInit {

  /** Font Awesome Icons */
  faPassport = faPassport;
  faIdBadge = faIdBadge;
  faTrophy = faTrophy;
  faBirthdayCake = faBirthdayCake;
  faWikipediaW = faWikipediaW;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructorId: string; // The id of the constructor 
  constructorDetails: F1ConstructorDetails;
  dataSource: MatTableDataSource<any>; // The data presented in the Constructor Results table 
  displayedColumns = [];  // The columns to be displayed in the Constructor Results table 
  constructorSubscription: any;
  championships: number;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private f1service: F1Service,
    private dialog: MatDialog

  ) {
    this.constructorId = this._Activatedroute.snapshot.paramMap.get("id");
  }

  showMap(circuitId: string) {
    /**
     * 
     * Opens a dialog with a Map with the Location Marker of the Circuit
     * @param {string} circuitId - the id of the circuit
     * 
     */
    this.f1service.getCircuitLatLong(circuitId)
      .then((circuit) => {
        this.dialog.open(MapComponent, {
          width: '500px',
          data: { lat: circuit.Location.lat, long: circuit.Location.long, name: circuit.circuitName }
        });
      });
  }

  applyFilter(event: Event) {
    /**
     * 
     * @param {Event} event - 
     * 
     */
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findColor(n: string) {
    /**
     * 
     * @param {string} n - The position earned 
     * @returns {string} - The corresponding class
     * 
     */
    if (n === '1') {
      return 'golden'
    } else if (n === '2') {
      return 'silver'
    } else if (n === '3') {
      return 'bronze'
    } else {
      return 'black'
    }
  }


  ngOnInit(): void {

    /** Fetching the number of the championships the constructor has earned */
    this.f1service.getConstructorChampionships(this.constructorId)
      .then((championships) => {
        this.championships = championships
      })
    
    /** Fetching constructor details */
    this.f1service.getConstructorDetails(this.constructorId)
      .then((cs) => {
        this.constructorDetails = cs;
      });

    /** Defining the columns to be displayed in the Constructor Results table */
    this.displayedColumns = ['circuitId', 'driverId', 'position', 'points', 'laps', 'status'];

    /** Fetching the data for the Constructor Results table */
    this.constructorSubscription = this.f1service.getConstructorResultsWithYearObservable(this.constructorId)
      .subscribe((constructorResults) => {
        let tab = [];
        constructorResults.forEach((race) => {
          let circuitId = race.Circuit.circuitId
          let circuitName = race.Circuit.circuitName
          race.Results.forEach((results: any) => {
            let driverID = results.Driver.driverId
            let driverGivenName = results.Driver.givenName
            let driverFamilyName = results.Driver.familyName
            let position = results.position
            let laps = results.laps
            let status = results.status
            let points = results.points
            tab.push({ circuitName: circuitName, circuitId: circuitId, driverID: driverID, position: position, laps: laps, status: status, points: points, driverGivenName: driverGivenName, driverFamilyName: driverFamilyName })
          })
        })
        this.dataSource = new MatTableDataSource(tab)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });



  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.constructorSubscription.unsubscribe()
  }

}
