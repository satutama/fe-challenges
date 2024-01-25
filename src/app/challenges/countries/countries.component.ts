import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryComponent } from './components/country/country.component';
import { CountriesService, Country } from './services/countries.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CountryComponent,
    CountryCardComponent,
  ],
  templateUrl: './countries.component.html',
})
export class CountriesComponent implements OnInit {
  public filteredCountries$!: Observable<Country[]>;
  public name = new FormControl('');

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.filteredCountries$ = this.initCountries();
  }

  private initCountries(): Observable<Country[]> {
    return combineLatest([
      this.countriesService.countries$,
      this.name.valueChanges.pipe(debounceTime(200), startWith(null)),
    ]).pipe(
      map(([countries, countryName]) => {
        if (countryName) {
          return countries.filter((country: Country) =>
            country.name.common
              .toLocaleLowerCase()
              .includes(countryName.toLowerCase())
          );
        }

        return countries;
      })
    );
  }
}
