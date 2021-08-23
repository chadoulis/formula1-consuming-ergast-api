import { F1ConstructorDetails } from "./f1constructor";

export interface Driver {
    driverId: string,
    permanentNumber: string,
    code: string,
    url: string,
    givenName: string,
    familyName: string,
    dateOfBirth: string,
    nationality: string
}


export interface F1driver {
    position: string,
    positionText: string,
    points: string,
    wins: string,
    Driver: Driver,
    Constructors: [
        {
            constructorId: string,
            url: string,
            name: string,
            nationality: string
        }
    ]
}

export interface DriverStanding {
    position: string,
    positionText: string,
    points: string,
    wins: string,
    Driver: Driver,
    Constructors: F1ConstructorDetails[]
}

export interface Ds {
    position: string,
    driverId: string,
    constructorId: string,
    constructorname: string,
    points: string,
    wins: string,
    givenName: string,
    familyName: string
}

export interface Csf {
    position: string,
    constructorId: string,
    constructorName: string,
    points: string,
    wins: string
}

export interface Sle {
    season: string,
    round: string,
    DriverStandings: DriverStanding
}


