import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Country } from '../country';
import { CountriesCode } from './country-code.enum';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  public countries$: Observable<Country[]>;

  private API_URL = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {
    this.countries$ = this.getCountries();
  }

  public getCountry(code: string): Observable<Country> {
    return this.http.get<Country[]>(`${this.API_URL}/alpha/${code}`).pipe(
      map((countries) => this.parseCountryDetails(countries[0])),
      catchError((error) => throwError(() => error))
    );
  }

  private getCountries() {
    return this.http
      .get<Country[]>(`${this.API_URL}/independent?status=true`)
      .pipe(catchError((error) => throwError(() => error)));
  }

  private parseCountryDetails(country: Country): Country {
    let updatedCountry = country;

    for (const locale in country.name.nativeName) {
      const details = country.name.nativeName[locale];
      updatedCountry.name.commonNativeName = details.common
        ? details.common
        : updatedCountry.name.common;
    }

    for (const currency in country.currencies) {
      const currencies = country.currencies[currency];
      updatedCountry.commonCurrencyName = currencies.name
        ? currencies.name
        : '';
    }

    updatedCountry.parsedBorders = this.mapCodesWithNames(
      country.borders ?? []
    );

    return updatedCountry;
  }

  private mapCodesWithNames(codes: string[]): { [key: string]: string }[] {
    return codes.map((code) => ({
      [code]: CountriesCode[code as keyof typeof CountriesCode] || code,
    }));
  }
}
