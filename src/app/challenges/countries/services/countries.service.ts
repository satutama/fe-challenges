import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Country } from '../country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  public countries$: Observable<Country[]>;

  private API_URL = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {
    this.countries$ = this.getCountries();
  }

  public getCountry(name: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.API_URL}/name/${name}`).pipe(
      map((countries) => this.setFirstNativeCommonName(countries[0])),
      catchError((error) => throwError(() => error))
    );
  }

  private getCountries() {
    return this.http
      .get<Country[]>(`${this.API_URL}/all`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  private setFirstNativeCommonName(country: Country): Country {
    let updatedCountry = country;

    for (const locale in country.name.nativeName) {
      const details = country.name.nativeName[locale];
      updatedCountry.name.commonNativeName = details.common
        ? details.common
        : updatedCountry.name.common;
    }

    return updatedCountry;
  }
}
