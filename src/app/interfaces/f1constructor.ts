import { Circuit } from "./circuit";
import { Driver } from "./f1driver";

export interface F1ConstructorDetails {
    constructorId: string,
    url: string,
    name: string,
    nationality: string
}

export interface F1constructor {
    Constructor: [{
        constructorId: string,
        name: string,
        nationality: string,
        url: string
    }],
    points: string,
    position: string,
    positionText: string,
    wins: string
}


export interface Status {
    statusId: string,
    count: string,
    status: string
}



export interface FastestLapI {
    rank: string,
    lap: string,
    Time: {
        time: string
    },
    AverageSpeed: {
        units: string,
        speed: string
    }
}


export interface Race {
    season: string,
    round: string,
    url: string,
    raceName: string,
    Circuit: Circuit,
    date: string,
    time: string,
    Results: [
        {
            number: string,
            position: string,
            positionText: string,
            points: string,
            Driver: Driver,
            Constructor: F1ConstructorDetails
        }, {
            grid: string,
            laps: string,
            status: string,
            Time: {
                millis: string,
                time: string
            },
            FastestLap: FastestLapI
        }
    ]
}

