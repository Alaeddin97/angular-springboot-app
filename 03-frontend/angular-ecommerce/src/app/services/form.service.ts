import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let months: number[] = [];
    for (let month = startMonth; month <= 12; month++) {
      months.push(month);
    }
    return of(months);
  }

  getCreditCardYears(): Observable<number[]> {
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    let years: number[] = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    return of(years);
  }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<GetResponseCoutries>('http://localhost:8070/api/countries')
      .pipe(map((response) => response._embedded.Country));
  }

  getStatesByCountryCode(countryCode:string): Observable<State[]> {
    return this.http
      .get<GetResponseStates>('http://localhost:8070/api/states/search/findByCountryCode?code='+countryCode)
      .pipe(map((response) => response._embedded.State));
  }

}

export interface GetResponseCoutries {
  _embedded: {
    Country: Country[];
  };
}

export interface GetResponseStates {
  _embedded: {
    State: State[];
  };
}
