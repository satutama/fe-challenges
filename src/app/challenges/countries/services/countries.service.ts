import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Country } from '../country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  public countries$: Observable<Country[]>;
  private API_URL = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {
    this.countries$ = this.getCountries();
  }

  private getCountries() {
    return this.http
      .get<Country[]>(`${this.API_URL}`)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
export { Country };
