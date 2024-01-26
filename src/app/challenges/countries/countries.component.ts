import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { CountryCardComponent } from './components/country-card/country-card.component';
import { CountryComponent } from './components/country/country.component';
import { Regions } from './country';
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
  public regions = Regions;

  public name = new FormControl('');
  public region = new FormControl('');

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.filteredCountries$ = this.filterListener();
  }

  private filterListener(): Observable<Country[]> {
    return combineLatest([
      this.countriesService.countries$,
      this.name.valueChanges.pipe(debounceTime(200), startWith('')),
      this.region.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([countries, countryName, region]) => {
        return countries.filter((country: Country) => {
          const nameMatches =
            !countryName ||
            country.name.common
              .toLocaleLowerCase()
              .includes(countryName.toLowerCase());

          const regionMatches =
            !region ||
            country.region.toLocaleLowerCase().includes(region.toLowerCase());

          return nameMatches && regionMatches;
        });
      })
    );
  }
}
