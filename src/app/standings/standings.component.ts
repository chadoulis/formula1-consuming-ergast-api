import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { F1Service } from '../services/f1.service';
import { Csf, Ds } from '../interfaces/f1driver';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSelect) child: MatSelect;

  displayedColumns: string[];
  dataSource: MatTableDataSource<Csf | Ds>;
  contentControl = new FormControl();
  content?: string;
  standingsSubscription: any;
  constructorStandingsSubscription: any;

  constructor(
    private f1service: F1Service
  ) { }

  onValChange(value) {
    if (value === "drivers") {
      this.standingsSubscription.unsubscribe()
      this.standingsSubscription = this.f1service.getDriverStandingsWithYearObservable()
        .subscribe((driverStandings) => {
          let driverStandingsFlat = [];
          driverStandings.forEach((dr: any) => {
            driverStandingsFlat.push({
              position: dr.position,
              driverId: dr.Driver.driverId,
              constructorId: dr.Constructors[0].constructorId,
              constructorName: dr.Constructors[0].name,
              points: dr.points,
              wins: dr.wins,
              givenName: dr.Driver.givenName,
              familyName: dr.Driver.familyName
            })
          })
          this.dataSource = new MatTableDataSource(driverStandingsFlat)
          this.displayedColumns = ['position', 'driverId', 'constructorId', 'points', 'wins'];
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    } else if (value === "constructors") {
      this.standingsSubscription.unsubscribe()
      this.displayedColumns = ['position', 'constructorId', 'points', 'wins'];
      this.standingsSubscription = this.f1service.getConstructorStandingsWithYearObservable()
        .subscribe((constructorStandings) => {
          let constructorStandingsFlat = [];
          constructorStandings.forEach((dr: any) => {
            constructorStandingsFlat.push({
              position: dr.position,
              constructorId: dr.Constructor.constructorId,
              constructorName: dr.Constructor.name,
              points: dr.points,
              wins: dr.wins
            })
          })
          this.dataSource = new MatTableDataSource(constructorStandingsFlat)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
    }
  }

  ngOnInit() {
    this.content = "constructors"
    this.standingsSubscription = this.f1service.getConstructorStandingsWithYearObservable()
      .subscribe((constructorStandings) => {
        let constructorStandingsFlat = [];
        constructorStandings.forEach((dr: any) => {
          constructorStandingsFlat.push({
            position: dr.position,
            constructorId: dr.Constructor.constructorId,
            constructorName: dr.Constructor.name,
            points: dr.points,
            wins: dr.wins
          })
        })
        this.dataSource = new MatTableDataSource(constructorStandingsFlat)
        this.displayedColumns = ['position', 'constructorId', 'points', 'wins'];
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.standingsSubscription.unsubscribe()
  }

}
