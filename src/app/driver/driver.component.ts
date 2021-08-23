import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Race } from '../interfaces/f1constructor';
import { F1Service } from '../services/f1.service';
import { faPassport, faBirthdayCake, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../map/map.component';
import { Driver } from '../interfaces/f1driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements AfterViewInit {

  /** Font Awesome Icons */
  faPassport = faPassport;
  faTrophy = faTrophy;
  faBirthdayCake = faBirthdayCake;
  faWikipediaW = faWikipediaW;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  driverId: string;
  driverDetails: Driver;
  dataSource: MatTableDataSource<Race>
  displayedColumns: string[];
  driverSubscription: any;
  championships: number;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private f1service: F1Service,
    private dialog: MatDialog
  ) {
    this.driverId = this._Activatedroute.snapshot.paramMap.get("id");
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


  ngOnInit() {

    /** Fetching the number of the driver's championships */
    this.f1service.getDriverChampionships(this.driverId)
      .then((championships) => {
        this.championships = championships
      })

    /** Fetching the driver's results according to the year selected */
    this.driverSubscription = this.f1service.getDriverResultsWithYearObservable(this.driverId)
      .subscribe((driversResults) => {
        this.dataSource = new MatTableDataSource(driversResults)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    /** Defining the columns to be displayed in the Driver Results table */
    this.displayedColumns = ['position', 'circuitName', 'laps', 'status', 'points'];

    /** Fetching Driver details */
    this.f1service.getDriverDetails(this.driverId)
      .then((cs) => {
        this.driverDetails = cs;
      });

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.driverSubscription.unsubscribe()
  }

}

