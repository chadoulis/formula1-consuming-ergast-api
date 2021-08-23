import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { F1constructor, F1ConstructorDetails, Race, Status } from '../interfaces/f1constructor';
import { BehaviorSubject, Observable } from 'rxjs';
import { Driver, DriverStanding, Sle } from '../interfaces/f1driver';
import { map, switchMap } from 'rxjs/operators';
import { Circuit } from '../interfaces/circuit';

@Injectable({
  providedIn: 'root'
})
export class F1Service {


  private selectedYear: BehaviorSubject<number> = new BehaviorSubject(2021);
  dataConstructor: Observable<F1constructor[]>;

  constructor(
    private http: HttpClient
  ) { }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  ////////////////////////////////////////
  // 1.1 Getting constructor standings  //
  ////////////////////////////////////////

  /** Using Promise */
  getConstructorStandings(): Promise<F1constructor[]> {
    return this.http.get('https://ergast.com/api/f1/current/constructorStandings.json')
      .toPromise()
      .then((response: any) => response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings as F1constructor[])
      .catch(this.handleError);
  }

  /** Using Observable */
  getConstructorStandingsWithYearObservable(): Observable<F1constructor[]> {
    return this.selectedYear.pipe(switchMap((selectedYear: number) => {
      return this.http.get<F1constructor[]>(`https://ergast.com/api/f1/${selectedYear}/constructorStandings.json`)
        .pipe(map((response: any) => response.MRData.StandingsTable.StandingsLists[0].ConstructorStandings as F1constructor[]))
    }))
  }

  ////////////////////////////////////
  // 1.2 Getting driver standings   //
  ////////////////////////////////////

  /** Using Promise */
  getDriverStandings(): Promise<DriverStanding[]> {
    return this.http.get('https://ergast.com/api/f1/current/driverStandings.json')
      .toPromise()
      .then((response: any) => response.MRData.StandingsTable.StandingsLists[0].DriverStandings as DriverStanding[])
      .catch(this.handleError);
  }

  /** Using Observable */
  getDriverStandingsWithYearObservable(): Observable<DriverStanding[]> {
    return this.selectedYear.pipe(switchMap((selectedYear: number) => {
      return this.http.get<DriverStanding[]>(`https://ergast.com/api/f1/${selectedYear}/driverStandings.json`)
        .pipe(map((response: any) => response.MRData.StandingsTable.StandingsLists[0].DriverStandings as DriverStanding[]))
    }))
  }

  ///////////////////////////////////////
  // 2.1 Getting driver championsips   //
  ///////////////////////////////////////


  getDriverChampionships(driverId): Promise<number> {
    return this.http.get(`https://ergast.com/api/f1/drivers/${driverId}/driverStandings/1.json`)
      .toPromise()
      .then((response: any) => response.MRData.StandingsTable.StandingsLists.length as number)
      .catch(this.handleError);
  }

  /////////////////////////////////////////////
  // 2.2 Getting constructor championships   //
  /////////////////////////////////////////////


  getConstructorChampionships(constructorId): Promise<number> {
    return this.http.get(`https://ergast.com/api/f1/constructors/${constructorId}/constructorStandings/1.json`)
      .toPromise()
      .then((response: any) => response.MRData.StandingsTable.StandingsLists.length as number)
      .catch(this.handleError);
  }


  ///////////////////////////////////////
  //  3.1 Getting Constructor Results  //
  ///////////////////////////////////////

  /** Using Promise */
  getConstructorResults(id: string): Promise<Race[]> {
    return this.http.get('https://ergast.com/api/f1/current/constructors/' + id + '/results.json')
      .toPromise()
      .then((response: any) => response.MRData.RaceTable.Races as Race[])
      .catch(this.handleError)
  }

  /** Using Year Observable */
  getConstructorResultsWithYearObservable(id: string): Observable<Race[]> {
    return this.selectedYear.pipe(switchMap((selectedYear: number) => {
      return this.http.get<Race[]>(`https://ergast.com/api/f1/${selectedYear}/constructors/${id}/results.json`)
        .pipe(map((response: any) => response.MRData.RaceTable.Races as Race[]))
    }))
  }

  ////////////////////////////////
  // 3.2 Getting Driver Results //
  ////////////////////////////////

  /** Using Promise */
  getDriverResults(id: string): Promise<Race[]> {
    return this.http.get('https://ergast.com/api/f1/current/drivers/' + id + '/results.json')
      .toPromise()
      .then((response: any) => response.MRData.RaceTable.Races as Race[])
      .catch(this.handleError)
  }

  /** Using Year Observable */
  getDriverResultsWithYearObservable(id: string): Observable<Race[]> {
    return this.selectedYear.pipe(switchMap((selectedYear: number) => {
      return this.http.get<Race[]>(`https://ergast.com/api/f1/${selectedYear}/drivers/${id}/results.json`)
        .pipe(map((response: any) => response.MRData.RaceTable.Races as Race[]))
    }))
  }

  ///////////////////////////////////
  // 4.1 Getting Constructors list //
  ///////////////////////////////////

  /** Using Promise */
  getConstructorsList(): Promise<F1ConstructorDetails[]> {
    return this.http.get('https://ergast.com/api/f1/current/constructors.json')
      .toPromise()
      .then((response: any) => response.MRData.ConstructorTable.Constructors as F1ConstructorDetails[])
      .catch(this.handleError)
  }

  /** Using Observable */
  getConstructorsListWithYearObservable(): Observable<F1ConstructorDetails[]> {
    return this.selectedYear.pipe(switchMap((selectedYear: number) => {
      return this.http.get<F1ConstructorDetails[]>(`https://ergast.com/api/f1/${selectedYear}/constructors.json`)
        .pipe(map((response: any) => response.MRData.ConstructorTable.Constructors as F1ConstructorDetails[]))
    }))
  }


  //////////////////////////////
  // 4.2 Getting Drivers list //
  //////////////////////////////

  /** Using Promise */
  getDriversList(): Promise<Driver[]> {
    return this.http.get('https://ergast.com/api/f1/current/drivers.json')
      .toPromise()
      .then((response: any) => response.MRData.DriverTable.Drivers as Driver[])
      .catch(this.handleError)
  }

  /** Using Observable */
  getDriverListObservable(): Observable<Driver[]> {
    return this.selectedYear.pipe(switchMap((selectedYear: number) => {
      return this.http.get<Driver[]>(`https://ergast.com/api/f1/${selectedYear}/drivers.json`)
        .pipe(map((response: any) => response.MRData.DriverTable.Drivers as Driver[]))
    }))
  }



  /////////////////////////
  // 5.1 Getting Details //
  /////////////////////////

  getConstructorDetails(constructorId: string): Promise<F1ConstructorDetails> {
    return this.http.get(`https://ergast.com/api/f1/constructors/${constructorId}.json`)
      .toPromise()
      .then((response: any) => response.MRData.ConstructorTable.Constructors[0] as F1ConstructorDetails)
      .catch(this.handleError);
  }

  getConstructorCircuits(constructorId: string): Promise<Circuit[]> {
    return this.http.get(`https://ergast.com/api/f1/constructors/${constructorId}/circuits.json`)
      .toPromise()
      .then((response: any) => response.MRData.CircuitTable.Circuits as Circuit[])
      .catch(this.handleError);
  }

  getConstructorStatus(constructorId: string): Promise<Status[]> {
    return this.http.get(`https://ergast.com/api/f1/constructors/${constructorId}/status.json`)
      .toPromise()
      .then((response: any) => response.MRData.StatusTable.Status as Circuit[])
      .catch(this.handleError);
  }

  getDriverDetails(driverId: string): Promise<Driver> {
    return this.http.get(`https://ergast.com/api/f1/current/drivers/${driverId}.json`)
      .toPromise()
      .then((response: any) => response.MRData.DriverTable.Drivers[0] as Driver)
      .catch(this.handleError)
  }

  getCircuitLatLong(circuitId: string): Promise<Circuit> {
    return this.http.get(`https://ergast.com/api/f1/current/circuits/${circuitId}.json`)
      .toPromise()
      .then((response: any) => response.MRData.CircuitTable.Circuits[0] as Circuit)
      .catch(this.handleError)
  }


  //////////////////////
  // 6. Hall of fame  //
  //////////////////////

  /** A series of functions that query and summarize data from all seasons */

  getDriverHallOfFame(): Promise<Sle[]> {
    return this.http.get('https://ergast.com/api/f1/driverStandings/1.json?limit=100')
      .toPromise()
      .then((response: any) => response.MRData.StandingsTable.StandingsLists as Sle[])
      .catch(this.handleError)
  }

  getConstructorHallOfFame(): Promise<F1constructor[]> {
    return this.http.get('https://ergast.com/api/f1/constructorStandings/1.json?limit=100')
      .toPromise()
      .then((response: any) => response.MRData.StandingsTable.StandingsLists as F1constructor[])
      .catch(this.handleError)
  }


  public setSelectedYear(selectedYear: number) {
    this.selectedYear.next(selectedYear);
  }

}


